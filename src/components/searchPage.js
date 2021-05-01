/* eslint-disable no-loop-func */
// This page will host the search bar, the table displaying movie info, and the trailer for the movie
// FORMAT PAGE WHEN RETURNING -- LOOK AT EXAMPLES OF OTHER PAGES LIKE TMDB AND BASE OFF THAT, HAVE TABLE NOT SPAN ACROSS ENTIRE PAGE TOO

// Necessary imports
import React, { Component } from 'react';
import axios from "axios";

export default class searchPage extends Component {

    // Constructor to hold default states
    constructor( props ) {
        super( props );

        // Binding functions
        this.onChangeMovieTitle = this.onChangeMovieTitle.bind( this );
        this.onHandleSubmit = this.onHandleSubmit.bind( this );
        this.onComponentDidMount = this.onComponentDidMount.bind( this );

        // Setting default state of values
        this.state = {
            title : ""
        }
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
        var title = this.state.title;

        // Call function to send request with given title to OMDB API
        this.onComponentDidMount( title );

        // Set default state of variable again
        this.setState( {
            title : ""
        });
    }

    // Function to send request to TMDB API and display response to user
    async onComponentDidMount( title ) {
        // Try and catch blocks -- send request to API via Axios, catch any errors that occur
        try {
            var key = process.env.REACT_APP_API_KEY; // Change to REACT_APP_API_KEY later, not working now for some reason
            
            // Empty array that will hold values from API call
            const result = [];

            // Search for the given movie title within the TMDB API to retrieve its unique ID for more detailed requests
            let response = await axios.get( "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&query=" + title )
            var id = response.data.results[0].id;

            // Using the movie ID retrieved from previous call, query for more details about the given movie
            let detailedResponse = await axios.get( "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + key + "&append_to_response=credits,release_dates,videos");
            var movieData = detailedResponse.data;

            // Get associated genres from movie
            var movieGenres = "";
            // Add commas after every genre before the last one
            for( var genreIndex = 0; genreIndex < movieData.genres.length - 1; genreIndex++ ) {
                var genreTitle = movieData.genres[ genreIndex ].name + ", ";
                movieGenres += genreTitle;
            }
            // Add "and" preceding last genre for formatting purposes
            movieGenres += "and " + movieData.genres[ movieData.genres.length - 1 ].name;

            // Get first five actors from movie
            var movieActors = "";
            // Use loop to add first four actors followed by a comma
            for( var actorIndex = 0; actorIndex < 4; actorIndex++ ) {
                var actor = movieData.credits.cast[ actorIndex ].name + ", ";
                movieActors += actor;
            }
            // Add last actor preceded by "and" -- all done for formatting purposes
            movieActors += "and " + movieData.credits.cast[ 4 ].name;

            // Get the director of the movie
            var movieDirector = "";
            for( var directorIndex = 0; directorIndex < movieData.credits.crew.length; directorIndex++ ) {
                if( movieData.credits.crew[ directorIndex ].job === "Director" ) {
                    var director = movieData.credits.crew[ directorIndex ].name;
                }
                movieDirector = director;
            }

            // Get the rating of the movie for the US only
            var movieRating = "";
            for( var ratingIndex = 0; ratingIndex < movieData.release_dates.results.length; ratingIndex++ ) {
                if( movieData.release_dates.results[ ratingIndex ].iso_3166_1 === "US" ) {
                    var rating = movieData.release_dates.results[ ratingIndex ].release_dates[ 0 ].certification;
                }
                movieRating = rating;
            }

            // Get tagline for movie and italicize it for formatting purposes
            var tagline = movieData.tagline.italics();

            // Get release date from JSON and make it readable -- split into an array
            var readableReleaseDate = movieData.release_date.split( '-' );
            var year = readableReleaseDate[ 0 ];
            // Array of months to be used
            var months = [ undefined, "January", "February", "March", "April", "May",
                           "June", "July", "August", "September", "October", "November",
                           "December" ];
            var monthIndex = parseInt( readableReleaseDate[ 1 ] );
            var month = months[ monthIndex ];
            // Get day from array and turn it into an int
            var day = parseInt( readableReleaseDate[ 2 ] );
            // Put everything together to make it readable to the user
            var fullDate = month + " " + day + ", " + year;

            // Get revenue from JSON data and add commas to it to make it readable
            var revenue = movieData.revenue;
            var readableRevenue = revenue.toString().split( "." );
            readableRevenue[0] = readableRevenue[0].replace( /\B(?=(\d{3})+(?!\d))/g, "," );
            readableRevenue.join( "." );

            // Get runtime in minutes from JSON data and convert to hours and minutes format instead
            var runtime = movieData.runtime;
            var hours = Math.floor( runtime / 60 );
            var minutes = Math.round( ( ( runtime / 60 ) - hours ) * 60 );
            var readableRuntime = hours + " hour(s) and " + minutes + " minute(s).";

            // Save links for poster and trailer to use later
            var posterLink = movieData.poster_path;
            var videoLink = movieData.videos.results[0].key;
            
            // Place values from detailed response into object 
            const values = {
                title : movieData.title,
                tagline : tagline,
                plot : movieData.overview,
                genres : movieGenres,
                actors : movieActors,
                releaseDate : fullDate,
                revenue : '$' + readableRevenue,
                runtime : readableRuntime,
                rating : movieRating,
                director : movieDirector
            };

            // Push values to array to be used for table generation
            result.push( values );
            this.generateTable( result, posterLink, videoLink );
        }
        catch( error ) {
            console.error( "An error has occurred.", error );
        }
    }

    // Function to dynamically generate table from given array of movie info
    generateTable( array, poster, video ) {
        // Start off by creating a table to later be appended
        var table = document.createElement( "table" );

        // Array of headers to be displayed as table headers
        var headers = [ "Title", "Tagline", "Plot", "Genres", "Actors", 
                        "Release Date", "Revenue", "Runtime", "Rating", "Director" ];
        var tr = table.insertRow( -1 );

        // Add headers to table
        for( var index = 0; index < headers.length; index++ ) {
            var th = document.createElement( "th" );
            th.innerHTML = headers[ index ];
            tr.appendChild( th );
        }

        // Add data from JSON array to table
        var newArray = array[0];
        let keys = Object.keys( newArray );
        for( var index2 = 0; index2 < array.length; index2++ ) {
            tr = table.insertRow( -1 );
            for( var index3 = 0; index3 < headers.length; index3++ ) {
                var tableCell = tr.insertCell( -1 );
                tableCell.innerHTML = newArray[ keys[ index3 ] ];
            }
        }

        // Add table to page
        var divShowData = document.getElementsByClassName( "showData" );
        divShowData.innerHTML = "";
        divShowData[0].appendChild( table );

        // Add movie poster to page using given poster link
        var posterImage = "https://image.tmdb.org/t/p/w500" + poster;
        var html = [
            '<img src=' + posterImage + ' />'
        ].join( '\n' );
        var showPoster = document.getElementsByClassName( "showPoster" );
        showPoster[0].innerHTML = html;

        // Add video for trailer to page by embedding it -- code based on help from StackOverflow
        var showVideo = document.getElementsByClassName( "showVideo" );
        var youtube = showVideo[ 0 ];
        var videoId = video;

        // Find YouTube thumbnail using given id
        var img = document.createElement( "img" );
        img.setAttribute( "src", "http://i.ytimg.com/vi/"
                        + videoId + "/hqdefault.jpg" );
        img.setAttribute( "class", "thumb" );


        // Overlay the Play icon to make it look like a video player
        var circle = document.createElement( "div" );
        circle.setAttribute( "class","circle" );

        youtube.appendChild( img );
        youtube.appendChild( circle );

        // Attach an onclick event to the YouTube Thumbnail
        youtube.onclick = function() {
            // Create an iFrame with autoplay set to true
            var iframe = document.createElement( "iframe" );
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

    // Helper function to format certain aspects of the generated table
    formatHelper( input ) {

    }

    // Function to render form to user and response from API
    render() {
        return (
            <div className = "form">
                <form onSubmit = { this.onHandleSubmit }>
                    <div className = "enterField">
                        <h1> Search Page </h1>
                        <label> Enter Movie Title: </label>
                        <input type = "text"
                               className = "enterField"
                               placeholder = "Enter movie here!"
                               value = { this.state.title }
                               onChange = { this.onChangeMovieTitle } />
                    </div>
                    <div className = "submitField">
                        <input type = "submit" value = "Submit" className = "submitButton"/>
                    </div>
                </form>
                <p className = "showData"> </p>
                <div className = "posterAndVideo"> 
                    <div className = "showPoster" style = {{ float : "left", marginLeft : "10%" }}> </div>
                    <div className = "showVideo" style = {{ width : "560px", height : "315px", float : "right", marginRight : "10%" }}> </div>
                </div>
            </div>
        )
    }
}