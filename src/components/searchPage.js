/* eslint-disable no-loop-func */
// This page will host the search bar and the field displaying movie info

// Necessary imports
import React, { Component } from 'react';
import axios from 'axios';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';
//import { userBoard } from '../../backend/controllers/user.controller';

export default class searchPage extends Component {

    // Constructor to hold default states
    constructor( props ) {
        super( props );

        // Binding functions
        this.onChangeMovieTitle = this.onChangeMovieTitle.bind( this );
        this.onHandleSubmit = this.onHandleSubmit.bind( this );
        this.onComponentDidMount = this.componentDidMount.bind( this );

        // Check if user is logged in or not -- display additional buttons if they are
        const user = AuthService.getCurrentUser();
        if( user ) {
            this.state = {
                title : "",
                values : [],
                currentUser : user,
                message : ""
            }
        } else {
            this.state = {
                title : "",
                values : [],
                currentUser : undefined,
                message : ""
            }
        }

        // Setting default state of values
        // this.state = {
        //     title : "",
        //     values : [],
        //     currentUser : undefined,
        //     message : ""
        // }
    }

    // Function to handle state of movie value -- constantly updating the value
    onChangeMovieTitle( event ) {
        this.setState( {
            title: event.target.value
        });
    }

    // Function to handle submission 
    onHandleSubmit( event ) {
        // Called to prevent page from reloading after user submits form
        event.preventDefault();

        // Assign user input to variable for movie title
        const title = this.state.title;

        // Call function to send request with given title to OMDB API
        this.onComponentDidMount( title );

        // Set default state of variable again
        this.setState( {
            title : "",
            values : [],
            message : ""
        } );
    }

    // Function to send request to TMDB API and display response to user
    async componentDidMount( title ) {
        // Try and catch blocks -- send request to API via Axios, catch any errors that occur
        try {
            const key = process.env.REACT_APP_API_KEY; // Change to REACT_APP_API_KEY later, not working now for some reason

            // Search for the given movie title within the TMDB API to retrieve its unique ID for more detailed requests
            let response = await axios.get( "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&query=" + title )
            const id = response.data.results[0].id;

            // Using the movie ID retrieved from previous call, query for more details about the given movie
            let detailedResponse = await axios.get( "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + key + "&append_to_response=credits,release_dates,videos");
            const movieData = detailedResponse.data;

            // Get associated genres from movie
            let movieGenres = "";
            // Add commas after every genre before the last one
            for( let genreIndex = 0; genreIndex < movieData.genres.length - 1; genreIndex++ ) {
                const genreTitle = movieData.genres[ genreIndex ].name + ", ";
                movieGenres += genreTitle;
            }
            // Add "and" preceding last genre for formatting purposes
            movieGenres += "and " + movieData.genres[ movieData.genres.length - 1 ].name;

            // Get first five actors from movie
            let movieActors = "";
            // Use loop to add first four actors followed by a comma
            for( let actorIndex = 0; actorIndex < 4; actorIndex++ ) {
                const actor = movieData.credits.cast[ actorIndex ].name + ", ";
                movieActors += actor;
            }
            // Add last actor preceded by "and" -- all done for formatting purposes
            movieActors += "and " + movieData.credits.cast[ 4 ].name;

            // Get the director of the movie
            let movieDirector = "";
            for( let directorIndex = 0; directorIndex < movieData.credits.crew.length; directorIndex++ ) {
                if( movieData.credits.crew[ directorIndex ].job === "Director" ) {
                    var director = movieData.credits.crew[ directorIndex ].name;
                }
                movieDirector = director;
            }

            // Get the rating of the movie for the US only
            let movieRating = "";
            for( let ratingIndex = 0; ratingIndex < movieData.release_dates.results.length; ratingIndex++ ) {
                if( movieData.release_dates.results[ ratingIndex ].iso_3166_1 === "US" ) {
                    var rating = movieData.release_dates.results[ ratingIndex ].release_dates[ 0 ].certification;
                }
                movieRating = rating;
            }

            // Get release date from JSON and make it readable -- split into an array
            const readableReleaseDate = movieData.release_date.split( '-' );
            const year = readableReleaseDate[ 0 ];
            // Array of months to be used
            const months = [ undefined, "January", "February", "March", "April", "May",
                           "June", "July", "August", "September", "October", "November",
                           "December" ];
            const monthIndex = parseInt( readableReleaseDate[ 1 ] );
            const month = months[ monthIndex ];
            // Get day from array and turn it into an int
            const day = parseInt( readableReleaseDate[ 2 ] );
            // Put everything together to make it readable to the user
            const fullDate = month + " " + day + ", " + year;

            // Get revenue from JSON data and add commas to it to make it readable
            const revenue = movieData.revenue;
            const readableRevenue = revenue.toString().split( "." );
            readableRevenue[0] = readableRevenue[0].replace( /\B(?=(\d{3})+(?!\d))/g, "," );
            readableRevenue.join( "." );

            // Get runtime in minutes from JSON data and convert to hours and minutes format instead
            const runtime = movieData.runtime;
            const hours = Math.floor( runtime / 60 );
            const minutes = Math.round( ( ( runtime / 60 ) - hours ) * 60 );
            const readableRuntime = hours + " hour(s) and " + minutes + " minute(s).";

            // Save links for poster and trailer to use later
            const posterLink = movieData.poster_path;
            const videoLink = movieData.videos.results[0].key;
            
            // Place values from detailed response into object 
            this.setState( {
                values : [
                    {
                        id : movieData.id,
                        title : movieData.title,
                        tagline : movieData.tagline,
                        plot : movieData.overview,
                        genres : movieGenres,
                        actors : movieActors,
                        releaseDate : fullDate,
                        revenue : '$' + readableRevenue,
                        runtime : readableRuntime,
                        rating : movieRating,
                        director : movieDirector,
                        poster : posterLink
                    }
                ]
            } );

            // Send video link to helper function to display to page
            this.generateVideo( videoLink );
        }
        catch( error ) {
            console.error( "An error has occurred.", error );
        }
    }

    // Function to dynamically generate YouTube video for given movie using code from their video player API
    generateVideo( video ) {
        // Add video for trailer to page by embedding it
        const showVideo = document.getElementsByClassName( "showVideo" );
        const youtube = showVideo[ 0 ];
        const videoId = video;

        // Find YouTube thumbnail using given id
        const img = document.createElement( "img" );
        img.setAttribute( "src", "http://i.ytimg.com/vi/"
                        + videoId + "/hqdefault.jpg" );
        img.setAttribute( "class", "thumb" );


        // Overlay the Play icon to make it look like a video player
        const circle = document.createElement( "div" );
        circle.setAttribute( "class","circle" );

        youtube.appendChild( img );
        youtube.appendChild( circle );

        // Attach an onclick event to the YouTube Thumbnail
        youtube.onclick = function() {
            // Create an iFrame with autoplay set to true
            const iframe = document.createElement( "iframe" );
            iframe.setAttribute( "src",
                "https://www.youtube.com/embed/" + videoId
                + "?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1" );

            // The height and width of the iFrame should be the same as parent
            iframe.style.width  = this.style.width;
            iframe.style.height = this.style.height;

            // Replace the YouTube thumbnail with YouTube HTML5 Player
            this.parentNode.replaceChild( iframe, this );    
        }
    }

    // Function for adding a movie to the Watch Later list
    saveToWatchLater( user, title ) {
        UserService.addToWatchLater( user, title )
        .then( response => {
            this.setState( {
                message : response.data.message
            } );
        },
        error => {
            const resMessage = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            this.setState( {
                message : resMessage
            } );
        })
    }

    // Function to render form to user and response from API -- START HERE WHEN RETURNING, POTENTIALLY RETURN ID INSTEAD OF TITLE IN FUTURE
    render() {
        const values = this.state.values;
        const currentUser = this.state.currentUser;
        let username = currentUser.username;
        return (
            <div>
                <h1> Search Page </h1>
                <div className = "formField">
                    <form className = "form" onSubmit = { this.onHandleSubmit }>
                        <input type = "text" className = "input" 
                               placeholder = "Enter movie here!" value = { this.state.title } 
                               onChange = { this.onChangeMovieTitle } />
                        <button type = "submit" className = "submitButton" > 
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </button>
                    </form>
                </div>

                <div className = "resultsField">
                    { values.map( value => (
                        <div className = "results" key = { value.id } >
                            <div className = "displayTotal"> 
                                <div className = "displayLeft">
                                    <p className = "title"> <span className = "titleSpan" style = { { fontSize : "35px", fontWeight : "bold" } }> { value.title } </span> </p>
                                    <p className = "showPoster"> <img src= { "https://image.tmdb.org/t/p/w400" + value.poster } alt = "Poster" /> </p>
                                    <p className = "tagline"> <span className = "taglineSpan" style = { { fontSize : "25px" } }> <i> { value.tagline } </i> </span> </p>
                                </div>
                                <br></br>
                                <div className = "displayRight">
                                    <p className = "plot"> <span className = "plotSpan" style = { { fontSize : "20px", fontWeight : "bold" } }> Plot: </span> { value.plot } </p>
                                    <p className = "genres"> <span className = "genresSpan" style = { { fontSize : "20px", fontWeight : "bold" } }> Genres: </span> { value.genres } </p>
                                    <p className = "actors"> <span className = "actorsSpan" style = { { fontSize : "20px", fontWeight : "bold" } }> Actors: </span> { value.actors } </p>
                                    <p className = "director"> <span className = "directorSpan" style = { { fontSize : "20px", fontWeight : "bold" } }> Director: </span> { value.director } </p>
                                    <p className = "releaseDate"> <span className = "releaseSpan" style = { { fontSize : "20px", fontWeight : "bold" } }> Release Date: </span> { value.releaseDate } </p>
                                    <p className = "revenue"> <span className = "revenueSpan" style = { { fontSize : "20px", fontWeight : "bold" } }> Total Revenue: </span> { value.revenue } </p>
                                    <p className = "runtime"> <span className = "runtimeSpan" style = { { fontSize : "20px", fontWeight : "bold" } }> Movie Runtime: </span> { value.runtime } </p>
                                    <p className = "rating"> <span className = "ratingSpan" style = { { fontSize : "20px", fontWeight : "bold" } }> Movie Rating: </span> { value.rating } </p>
                                </div>
                            </div>
                            <div className = "showVideo" style = { { width : "560px", height : "315px", float : "right", marginRight : "18%" } }> </div>
                            <br></br>
                            <br></br>
                            { currentUser && (
                                <div className = "moreButtons">
                                    <button type = "submit" className = "submitButton" onClick = { () => this.saveToWatchLater( username, value.title ) }> Add to Watch Later List </button>
                                    <button type = "submit" className = "submitButton" onClick = { () => UserService.addToFavorites() }> Add to Favorites Page </button>
                                </div>
                            ) }
                            <br></br>
                            <br></br>
                            <p id = "message"> { this.state.message } </p>
                        </div>
                    ))}
                </div> 
                
            </div>
        );
    }
}