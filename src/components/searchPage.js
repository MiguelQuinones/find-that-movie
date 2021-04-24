// This page will host the search bar and the table displaying movie info

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
            var key = process.env.REACT_APP_API_KEY_2; // Change to REACT_APP_API_KEY later, not working now for some reason
            
            // Empty array that will hold values from API call
            const result = [];

            // Search for the given movie title within the TMDB API to retrieve its unique ID for more detailed requests
            let response = await axios.get( "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&query=" + title )
            var id = response.data.results[0].id;

            // Using the movie ID retrieved from previous call, query for more details about the given movie
            let detailedResponse = await axios.get( "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + key + "&append_to_response=credits,release_dates,videos");
            console.log( "Detailed response below:" );
            var movieData = detailedResponse.data;
            console.log( movieData );

            // Get associated genres from movie
            var movieGenres = "";
            for( var genreIndex = 0; genreIndex < movieData.genres.length; genreIndex++ ) {
                var genreTitle = movieData.genres[ genreIndex ].name + " ";
                movieGenres += genreTitle;
            }

            // Get first five actors from movie
            var movieActors = "";
            for( var actorIndex = 0; actorIndex < 5; actorIndex++ ) {
                var actor = movieData.credits.cast[ actorIndex ].name + " ";
                movieActors += actor;
            }

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

            // Save links for poster and trailer to use later
            var posterLink = movieData.poster_path;
            var videoLink = movieData.videos.results[0].id;
            
            // Place values from detailed response into object 
            const values = {
                title : movieData.title,
                tagline : movieData.tagline,
                plot : movieData.overview,
                genres : movieGenres,
                actors : movieActors,
                releaseDate : movieData.release_date,
                revenue : movieData.revenue,
                runtime : movieData.runtime,
                rating : movieRating,
                director : movieDirector
            };

            // Push values to array to be used for table generation
            result.push( values );
            console.log( "Array result below:" );
            console.log( result );
            this.generateTable( result, posterLink, videoLink );
        }
        catch( error ) {
            console.error( "An error has occurred.", error );
        }
    }

    // Function to dynamically generate table from given array of movie info -- DISPLAY MOVIE POSTER WHEN RETURNING TO PROJECT
    generateTable( array, poster, video ) {
        // Start off by creating a table to later be appended
        console.log( array );
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

         console.log( "Array length: " + array.length );
         // Add data from JSON array to table
         var newArray = array[0];
         console.log( newArray );
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
         document.getElementById( "showPoster" ).innerHTML = html;

         // Add video for trailer to page -- WORK ON THIS WHEN RETURING TO PROJECT
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
                <div id = "showPoster"> </div>
                <div id = "showVideo"> </div>
            </div>
        )
    }
}