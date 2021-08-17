import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

export default class PlayingNowSlides extends Component {
    constructor( props ) {
        super( props );

        // Other initializing stuff
        this.state = {
            moviesArray : []
        }
    }

    // Get upcoming movies list from TMDB API
    async componentDidMount() {
        try {
            const key = process.env.REACT_APP_API_KEY;

            // Send request to API to get upcoming movies
            let response = await axios.get( "https://api.themoviedb.org/3/movie/now_playing?api_key=" + key + "&language=en-US&page=1" );

            // Store movie info for carousel slides
            this.setState( {
                moviesArray : response.data.results,
            } );
            console.log( "Array info: " );
            console.log( this.state.moviesArray );

        }
        catch( error ) {
            console.error( "An error occurred: " + error );
        }
    }

    // Render 8 slides based on movies currently in theaters from API
    render() {
        const movieData = this.state.moviesArray;
        return(
            <Row xs = { 1 } md = { 3 } className = "g-4">
                { Array.from( movieData ).map( ( movie, idx ) => (
                    <Col>
                        <Card>
                            <Card.Img variant = "bottom" src = { "https://image.tmdb.org/t/p/w500" + movie.poster_path } />
                            <Card.Body>
                                <Card.Title style = { { textAlign : "center" } }> { movie.title } </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ) ) }
            </Row>
        );
    }
}