import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";

export default class CarouselSlides extends Component {
    constructor( props ) {
        super( props );

        // Other initializing stuff
        this.state = {
            message : "",
            firstMovieTitle : "",
            firstMoviePoster : "",
            secondMovieTitle : "",
            secondMoviePoster : ""
        }
    }

    // Get upcoming movies list from TMDB API
    async componentDidMount() {
        try {
            const key = process.env.REACT_APP_API_KEY;

            // Send request to API to get upcoming movies
            let response = await axios.get( "https://api.themoviedb.org/3/movie/upcoming?api_key=" + key + "&language=en-US&page=1" );
            console.log( response );

            // Store movie info for carousel slides
            this.setState( {
                firstMovieTitle : response.data.results[ 0 ].title,
                firstMoviePoster : response.data.results[ 0 ].poster_path,
                secondMovieTitle : response.data.results[ 1 ].title,
                secondMoviePoster : response.data.results[ 1 ].poster_path
            } );

        }
        catch( error ) {
            console.error( "An error occurred: " + error );
        }
    }

    // Add up to 8 movies to carousel, add current slide indicator at bottom of slides also -- DO THIS WHEN RETURNING
    render() {
        return(
            <div className = "container" style = { { display: 'block', width: 700, padding: 30 } }>
                <Carousel>
                    <Carousel.Item interval = { 5000 }>
                        <img className = "d-block w-100" src = { "https://image.tmdb.org/t/p/w780" + this.state.firstMoviePoster } alt = "Slide One"/>
                        <Carousel.Caption>
                            <h3> { this.state.firstMovieTitle } </h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval = { 5000 }>
                        <img className = "d-block w-100" src = { "https://image.tmdb.org/t/p/w780" + this.state.secondMoviePoster } alt="Slide Two"/>
                        <Carousel.Caption>
                            <h3> { this.state.secondMovieTitle } </h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}