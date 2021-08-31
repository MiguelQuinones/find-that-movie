import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";

// TURN VIDEOLINKS AND VIDEONAMES INTO A DICTIONARY -- REFER TO BOOKMARKED PAGE
export default class SearchedMoviePage extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            message : "",
            movieInfo : [],
            movieGenres : "",
            movieActors : "",
            movieDirector : "",
            movieRating : "",
            movieReleaseDate : "",
            movieRevenue : "",
            movieRuntime : "",
            movieVideoKey : ""
        }
    }

    generateVideo( video ) {
        // Add video for trailer to page by embedding it
        const showVideo = document.getElementById( "movieTrailer" );
        const youtube = showVideo;
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

    // Get detailed movie info from TMDB API
    async componentDidMount() {
        try {
            const key = process.env.REACT_APP_API_KEY;
            const movieId = this.props.match.params.id;

            // Send detailed request to API using given movie ID
            let response = await axios.get( "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + key + "&append_to_response=credits,release_dates,videos" );
            // Save necessary info from response to state
            this.setState( {
                movieInfo : response.data
            } );
            console.log( this.state.movieInfo );

            // Get array of associated genres from movieInfo
            let genres = "";
            let genreTitle = "";
            for( let genreIndex = 0; genreIndex < this.state.movieInfo.genres.length; genreIndex++ ) {
                if( this.state.movieInfo.genres.length === 1 ) {
                    genreTitle = this.state.movieInfo.genres[ genreIndex ].name;
                    genres = genreTitle
                } else {
                    if( this.state.movieInfo.genres[ genreIndex ] !== this.state.movieInfo.genres[ this.state.movieInfo.genres.length - 1 ] ) {
                        genreTitle = this.state.movieInfo.genres[ genreIndex ].name + ", ";
                        genres += genreTitle;
                    }
                }
             }
             // Create completed list and split on "," for formatting purposes
            let completeGenres = genres.split( "," );
            if( completeGenres.length > 1 ) {
                completeGenres += "and " + this.state.movieInfo.genres[ this.state.movieInfo.genres.length - 1 ].name;
            }
            this.setState( {
                movieGenres : completeGenres
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
                    director = this.state.movieInfo.credits.crew[ directorIndex ].name;
                }
                this.setState( {
                    movieDirector : director
                } );
            }

            // Get the US rating of the movie from movieInfo
            let foundRating = ""
            for( let ratingIndex = 0; ratingIndex < this.state.movieInfo.release_dates.results.length; ratingIndex++ ) {
                if( this.state.movieInfo.release_dates.results[ ratingIndex ].iso_3166_1 === "US" ) {
                    if( this.state.movieInfo.release_dates.results[ ratingIndex ].release_dates[ 0 ].certification !== "" ) {
                        foundRating = this.state.movieInfo.release_dates.results[ ratingIndex ].release_dates[ 0 ].certification
                    } else {
                        foundRating = this.state.movieInfo.release_dates.results[ ratingIndex ].release_dates[ 1 ].certification
                    }
                }
                this.setState( {
                    movieRating : foundRating
                } );
            }

            // Get the release date of the movie from movieInfo and then make it readable to users
            let releaseDate = this.state.movieInfo.release_date.split( '-' );
            const year = releaseDate[ 0 ];
            // Array of months to be used
            const months = [ undefined, "January", "February", "March", "April", "May",
                           "June", "July", "August", "September", "October", "November",
                           "December" ];
            const monthIndex = parseInt( releaseDate[ 1 ] );
            const month = months[ monthIndex ];
            // Get day from array and turn it into an int
            const day = parseInt( releaseDate[ 2 ] );
            // Put everything together to make it readable to the user
            const fullDate = month + " " + day + ", " + year;
            this.setState( {
                movieReleaseDate : fullDate
            } );

            // Get the total revenue generated by the movie from movieInfo
            let revenue = this.state.movieInfo.revenue;
            const readableRevenue = revenue.toString().split( "." );
            readableRevenue[0] = readableRevenue[0].replace( /\B(?=(\d{3})+(?!\d))/g, "," );
            readableRevenue.join( "." );
            this.setState( {
                movieRevenue : readableRevenue
            } );

            // Get the total runtime from movieInfo and convert it to be more easily readable
            const runtime = this.state.movieInfo.runtime;
            const hours = Math.floor( runtime / 60 );
            const minutes = Math.round( ( ( runtime / 60 ) - hours ) * 60 );
            const readableRuntime = hours + " hour(s) and " + minutes + " minute(s).";
            this.setState( {
                movieRuntime : readableRuntime
            } );

            // Get first video from movieInfo that is listed as an offical trailer
            for( let videoIndex = 0; videoIndex < this.state.movieInfo.videos.results.length; videoIndex++ ) {
                // Break out of the loop after finding first matching result
                if( this.state.movieInfo.videos.results[ videoIndex ].official === true && this.state.movieInfo.videos.results[ videoIndex ].type === "Trailer"  ) {
                    this.setState( {
                        movieVideoKey : this.state.movieInfo.videos.results[ videoIndex ].key
                    } );
                    break;
                }
            }

            // Grab the video from YouTube and display to user
            this.generateVideo( this.state.movieVideoKey );
        }
        catch( error ) {
            console.error( "An error occurred: " + error );
        }
    }

    // Render a card with detailed info on the selected movie
    render() {
        const movie = this.state.movieInfo;
        const genres = this.state.movieGenres;
        const actors = this.state.movieActors;
        const director = this.state.movieDirector;
        const rating = this.state.movieRating;
        const revenue = this.state.movieRevenue;
        const runtime = this.state.movieRuntime;
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
                                <Card.Text style = { { fontWeight : "bold", textDecoration : "underline" } }> <h2> Movie Rating: </h2> </Card.Text>
                                <Card.Text> <h6> { rating } </h6> </Card.Text>
                                <Card.Text style = { { fontWeight : "bold", textDecoration : "underline" } }> <h2> Revenue: </h2> </Card.Text>
                                <Card.Text> <h6> { "$" + revenue } </h6> </Card.Text>
                                <Card.Text style = { { fontWeight : "bold", textDecoration : "underline" } }> <h2> Runtime: </h2> </Card.Text>
                                <Card.Text> <h6> { runtime } </h6> </Card.Text>
                                <Card.Text id = "movieTrailer" style = { { width : "560px", height : "315px" } }> </Card.Text>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }
}