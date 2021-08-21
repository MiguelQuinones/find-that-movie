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
            movieInfo : [],
            movieGenres : "",
            movieActors : "",
            movieDirector : ""
        }
    }

    // Get detailed movie info from TMDB API
    async componentDidMount() {
        try {
            const key = process.env.REACT_APP_API_KEY;
            const movieId = this.props.match.params.id;
            console.log( "ID is: " + this.props.match.params.id );

            // Send detailed request to API using given movie ID
            let response = await axios.get( "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + key + "&append_to_response=credits,release_dates,videos" );
            console.log( response );
            // Save necessary info from response to state
            this.setState( {
                movieInfo : response.data
            } );
            console.log( this.state.movieInfo );

            // Get array of associated genres from movieInfo
            let genres = "";
            for( let genreIndex = 0; genreIndex < this.state.movieInfo.genres.length - 1; genreIndex++ ) {
                const genreTitle = this.state.movieInfo.genres[ genreIndex ].name + ", ";
                genres += genreTitle;
             }
            // Add "and" preceding last genre for formatting purposes
            genres += "and " + this.state.movieInfo.genres[ this.state.movieInfo.genres.length - 1 ].name;
            // Save the formated list of genres to the state
            this.setState( {
                movieGenres : genres
            } );

            // Get array of associated actors from movieInfo
            let actors = "";
            for( let actorsIndex = 0; actorsIndex < 4; actorsIndex++ ) {
                const actor = this.state.movieInfo.credits.cast[ actorsIndex ].name + ", ";
                actors += actor;
            }
            actors += "and " + this.state.movieInfo.credits.cast[ 4 ].name;
            this.setState( {
                movieActors : actors
            } );

            // Get name of director from movieInfo
            let director = "";
            for( let directorIndex = 0; directorIndex < this.state.movieInfo.credits.crew.length; directorIndex++ ) {
                if( this.state.movieInfo.credits.crew[ directorIndex ].job === "Director" ) {
                    var movieDirector = this.state.movieInfo.credits.crew[ directorIndex ].name;
                }
                director = movieDirector;
            }
            this.setState( {
                movieDirector : director
            } );
            

        }
        catch( error ) {
            console.error( "An error occurred: " + error );
        }
    }

    // Render a card with detailed info -- button to link back to search page -- ADD REST TO CARD WHEN RETURNING
    render() {
        const movie = this.state.movieInfo;
        const genres = this.state.movieGenres;
        const actors = this.state.movieActors;
        const director = this.state.movieDirector;
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
                                <br></br>
                                <br></br>
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
                                <Card.Text> <h6> { genres } </h6> </Card.Text>
                                <Card.Text style = { { fontWeight : "bold", textDecoration : "underline" } }> <h2> Actors: </h2> </Card.Text>
                                <Card.Text> <h6> { actors } </h6> </Card.Text>
                                <Card.Text style = { { fontWeight : "bold", textDecoration : "underline" } }> <h2> Director: </h2> </Card.Text>
                                <Card.Text> <h6> { director } </h6> </Card.Text>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }
}