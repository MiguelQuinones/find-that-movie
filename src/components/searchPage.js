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

    // Function to send request to OMDB API and display response to user -- retrieve poster image from TMDB API
    onComponentDidMount( title ) {
        // Try and catch blocks -- send request to API via Axios, catch any errors that occur
        try {
            var key = process.env.REACT_APP_API_KEY;
            const result = [];
            axios.get( "http://www.omdbapi.com/?apikey=" + key + "&t=" + title )
            // Take data from JSON response and insert into an array
            //.then( response => console.log( response ) )
            .then( response => {
                const newItem = {
                    actors : response.data.Actors,
                    awards : response.data.Awards,
                    boxOffice : response.data.BoxOffice,
                    director : response.data.Director,
                    genre : response.data.Genre,
                    metascore : response.data.Metascore,
                    plot : response.data.Plot,
                    rated : response.data.Rated,
                    released : response.data.Released,
                    runtime : response.data.Runtime,
                    imdbRating : response.data.imdbRating
                };
                result.push( newItem );
                console.log( result );
                this.generateTable( result );
            })
            .catch( function( error ) {
                console.log( error )
            });
        }
        catch( error ) {
            console.error( "An error has occurred.", error );
        }
    }

    // Function to dynamically generate table from given array of movie info -- DISPLAY MOVIE POSTER WHEN RETURNING TO PROJECT
    generateTable( array ) {
        // Start off by creating a table to later be appended
        console.log( array );
         var table = document.createElement( "table" );

         // Array of headers to be displayed as table headers
         var headers = [ "Actors", "Awards", "Box Office", "Director", "Genre", "ImdbRating",
                         "Plot", "Rated", "Released", "Runtime", "Metascore" ];
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
            </div>
        )
    }
}