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

    // Function to send request to OMDB API and display response to user
    onComponentDidMount( title ) {
        // Try and catch blocks -- send request to API via Axios, catch any errors that occur -- keep trying to store JSON into array, otherwise just display info similarly to how I did in weather applicaiton
        try {
            let movieInfo = [];
            console.log( "Sending request..." );
            axios.post( "http://www.omdbapi.com/?apikey=17dbbd83&t=" + title )
            .then( res => console.log( res.data ) )
            .then( res => {
                const newItem = {
                    actors: res.data.Actors
                };
                movieInfo.push( newItem );
            })
            .catch( function( error ) {
                console.log( error )
            });
            console.log( "Request sent, printing populated movie list..." );

            movieInfo.forEach( ( element ) => {
                console.log( element )
            });
            console.log( "Done!" );
        }
        catch( error ) {
            console.error( "An error has occurred.", error );
        }
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
            </div>
        )
    }
}