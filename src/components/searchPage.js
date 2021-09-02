/* eslint-disable no-loop-func */
// This page will host the search bar and the field displaying movie info

// Necessary imports
import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default class searchPage extends Component {

    // Constructor to hold default states
    constructor( props ) {
        super( props );

        // Binding functions
        this.onChangeMovieTitle = this.onChangeMovieTitle.bind( this );
        this.onHandleSubmit = this.onHandleSubmit.bind( this );
        this.onComponentDidMountYes = this.componentDidMountYes.bind( this );

        this.state = {
            title : "",
            moviesArray : [],
            message : "",
            successful : false
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
        const title = this.state.title;

        // Call function to send request with given title to OMDB API
        this.onComponentDidMountYes( title );

        // Set default state of variable again
        this.setState( {
            title : "",
            moviesArray : [],
            message : "",
            successful : false
        } );
    }

    // Function to send request to TMDB API and display response to user
    async componentDidMountYes( title ) {
        // Try and catch blocks -- send request to API via Axios, catch any errors that occur
        try {
            const key = process.env.REACT_APP_API_KEY; // Change to REACT_APP_API_KEY later, not working now for some reason

            // Search for the given movie title within the TMDB API and add all results to array
            let response = await axios.get( "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&query=" + title );
            let counter = 0;
            for( let counterIndex = 0; counterIndex < response.data.results.length; counterIndex++ ) {
                counter++;
            }
            let counterMessage = "";
            let successOrNot = false;
            if( counter > 0 ) {
                counterMessage = "Found " + counter + " results";
                successOrNot = true;
            } else {
                counterMessage = "Could not find any results";
                successOrNot = false;
            }
            this.setState( {
                moviesArray : response.data.results,
                message : counterMessage,
                successful : successOrNot
            } );
            console.log( this.state.moviesArray );
        }
        catch( error ) {
            console.error( "An error has occurred.", error );
        }
    }

    // Function to render form to user and response from API
    render() {
        const movieData = this.state.moviesArray;
        return (
            <div>
                <h1> Search For <span className = "text-info"> Movies </span> </h1>
                <div className = "formField">
                    <form className = "form" onSubmit = { this.onHandleSubmit }>
                        <div className = "input-group mb-3">
                            <input type = "text" className = "form-control" placeholder = "Enter movie title here!" 
                                   value = { this.state.title} onChange = { this.onChangeMovieTitle } 
                                   aria-label="Movie's title" aria-describedby="button-addon2"/>
                            <button className = "btn btn-primary" type = "button" id = "button-addon2"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width = "50" height = "16" fill = "currentColor" className = "bi bi-search" viewBox = "0 0 16 16">
                                <path d = "M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg> 
                            </button>
                        </div>
                    </form>
                </div>

                <div className = "container">
                    { this.state.message && (
                        <div>
                            <div className = {
                                this.state.successful ? "alert alert-success" : "alert alert-danger"
                                } style = { { textAlign : "center" } } role = "alert">
                                    { this.state.message }
                            </div>
                        </div>
                    ) }
                    <Row xs = { 1 } md = { 3 } className = "g-4">
                        { Array.from( movieData ).map( ( movie, idx ) => (
                            <Col>
                                <Card>
                                    <Card.Img variant = "bottom" src = { "https://image.tmdb.org/t/p/w500" + movie.poster_path } />
                                    <Card.Body>
                                        <Card.Title style = { { textAlign : "center" } }> { movie.title } </Card.Title>
                                        <Card.Subtitle> { movie.tagline } </Card.Subtitle>
                                        <div className = "d-grid gap-2">
                                            <Button varaint = "primary" size = "lg" href = { `searchedMoviePage/${ movie.id }` }> More Info </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ) ) }
                    </Row>
                </div>
            </div>
        );
    }
}