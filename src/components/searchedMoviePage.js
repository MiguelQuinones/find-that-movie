import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class SearchedMoviePage extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            message : "",
            movieInfo : []
        }
    }

    // Get detailed movie info from TMDB API
    async componentDidMount() {
        try {
            const key = process.env.REACT_APP_API_KEY;
            const movieId = this.props.match.params.id;
            console.log( "ID is: " + this.props.match.params.id );

            // Send detailed request to API using given movie ID
            let response = await axios.get( "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + key + "&language=en-US" );
            console.log( response );
            this.setState( {
                movieInfo : response.data
            } );
            console.log( this.state.movieInfo );
            

        }
        catch( error ) {
            console.error( "An error occurred: " + error );
        }
    }

    // Render a card with detailed info -- button to link back to search page -- ADD REST TO CARD WHEN RETURNING
    render() {
        const movie = this.state.movieInfo;
        return(
            <div className = "container">
                <Card>
                    <Row>
                        <Col lg = "6">
                            <Card.Body>
                                <Button variant = "primary" size = "lg" href = { "/" }> Go Back Home </Button>
                                <br></br>
                                <br></br>
                                <Card.Title> <h1 className = "text-center" > { movie.title } </h1> </Card.Title>
                                <Card.Img src = { "https://image.tmdb.org/t/p/w780" + movie.poster_path } ></Card.Img>
                                <Card.Text> <h3 className = "text-center"> <i> { movie.tagline } </i> </h3></Card.Text>
                            </Card.Body>
                        </Col>
                        <Col lg = "6">
                            <Card.Body>
                                <br></br>
                                <br></br>
                                <br></br>
                                <Card.Text style = { { fontWeight : "bold", textDecoration : "underline" } }> <h2> Plot: </h2> </Card.Text>
                                <Card.Text> <h6> { movie.overview } </h6> </Card.Text>
                                <Card.Text style = { { fontWeight : "bold", textDecoration : "underline" } }> <h2> Genres: </h2> </Card.Text>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }
}