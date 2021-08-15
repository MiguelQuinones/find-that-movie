import React, { Component } from "react";
//import Carousel from "react-bootstrap/Carousel";
import axios from "axios";

export default class PlayingNowSlides extends Component {
    constructor( props ) {
        super( props );

        // Other initializing stuff
        this.state = {
            message : "",
            firstMovieTitle : "",
            firstMoviePoster : "",
            secondMovieTitle : "",
            secondMoviePoster : "",
            thirdMovieTitle : "",
            thirdMoviePoster : "",
            fourthMovieTitle : "",
            fourthMoviePoster : "",
            fifthMovieTitle : "",
            fifthMoviePoster : "",
            sixthMovieTitle : "",
            sixthMoviePoster : "",
            seventhMovieTitle : "",
            seventhMoviePoster : "",
            eighthMovieTitle : "",
            eigthMoviePoster : ""
        }
    }

    // Get upcoming movies list from TMDB API
    async componentDidMount() {
        try {
            const key = process.env.REACT_APP_API_KEY;

            // Send request to API to get upcoming movies
            let response = await axios.get( "https://api.themoviedb.org/3/movie/now_playing?api_key=" + key + "&language=en-US&page=1" );
            console.log( "Movies Now Playing: " );
            console.log( response );

            // Store movie info for carousel slides
            this.setState( {
                firstMovieTitle : response.data.results[ 0 ].title,
                firstMoviePoster : response.data.results[ 0 ].backdrop_path,
                secondMovieTitle : response.data.results[ 1 ].title,
                secondMoviePoster : response.data.results[ 1 ].backdrop_path,
                thirdMovieTitle : response.data.results[ 2 ].title,
                thirdMoviePoster : response.data.results[ 2 ].backdrop_path,
                fourthMovieTitle : response.data.results[ 3 ].title,
                fourthMoviePoster : response.data.results[ 3 ].backdrop_path,
                fifthMovieTitle : response.data.results[ 4 ].title,
                fifthMoviePoster : response.data.results[ 4 ].backdrop_path,
                sixthMovieTitle : response.data.results[ 5 ].title,
                sixthMoviePoster : response.data.results[ 5 ].backdrop_path,
                seventhMovieTitle : response.data.results[ 6 ].title,
                seventhMoviePoster : response.data.results[ 6 ].backdrop_path,
                eigthMovieTitle : response.data.results[ 7 ].title,
                eigthMoviePoster : response.data.results[ 7 ].backdrop_path
            } );

        }
        catch( error ) {
            console.error( "An error occurred: " + error );
        }
    }

    // Render 8 slides based on movies currently in theaters from API
    render() {
        return(
            // <div className = "container" style = { { display : 'block', width : 800, padding : 30 } }>
            //     <h1> Currently Playing <span className = "text-info"> Movies </span> </h1>
            //     <br></br>
            //     <Carousel nextLabel = "" prevLabel = "" fade = "true">
            //         <Carousel.Item>
            //             <img className = "d-block w-100" src = { "https://image.tmdb.org/t/p/w780" + this.state.firstMoviePoster } alt = "Slide"/>
            //             <Carousel.Caption>
            //                 <h3> { this.state.firstMovieTitle } </h3>
            //             </Carousel.Caption>
            //         </Carousel.Item>

            //         <Carousel.Item>
            //             <img className = "d-block w-100" src = { "https://image.tmdb.org/t/p/w780" + this.state.secondMoviePoster } alt="Slide"/>
            //             <Carousel.Caption>
            //                 <h3> { this.state.secondMovieTitle } </h3>
            //             </Carousel.Caption>
            //         </Carousel.Item>

            //         <Carousel.Item>
            //             <img className = "d-block w-100" src = { "https://image.tmdb.org/t/p/w780" + this.state.thirdMoviePoster } alt = "Slide"/>
            //             <Carousel.Caption>
            //                 <h3> { this.state.thirdMovieTitle } </h3>
            //             </Carousel.Caption>
            //         </Carousel.Item>

            //         <Carousel.Item>
            //             <img className = "d-block w-100" src = { "https://image.tmdb.org/t/p/w780" + this.state.fourthMoviePoster } alt = "Slide"/>
            //             <Carousel.Caption>
            //                 <h3> { this.state.fourthMovieTitle } </h3>
            //             </Carousel.Caption>
            //         </Carousel.Item>

            //         <Carousel.Item>
            //             <img className = "d-block w-100" src = { "https://image.tmdb.org/t/p/w780" + this.state.fifthMoviePoster } alt = "Slide"/>
            //             <Carousel.Caption>
            //                 <h3> { this.state.fifthMovieTitle } </h3>
            //             </Carousel.Caption>
            //         </Carousel.Item>

            //         <Carousel.Item>
            //             <img className = "d-block w-100" src = { "https://image.tmdb.org/t/p/w780" + this.state.sixthMoviePoster } alt = "Slide"/>
            //             <Carousel.Caption>
            //                 <h3> { this.state.sixthMovieTitle } </h3>
            //             </Carousel.Caption>
            //         </Carousel.Item>

            //         <Carousel.Item>
            //             <img className = "d-block w-100" src = { "https://image.tmdb.org/t/p/w780" + this.state.seventhMoviePoster } alt = "Slide"/>
            //             <Carousel.Caption>
            //                 <h3> { this.state.seventhMovieTitle } </h3>
            //             </Carousel.Caption>
            //         </Carousel.Item>

            //         <Carousel.Item>
            //             <img className = "d-block w-100" src = { "https://image.tmdb.org/t/p/w780" + this.state.eigthMoviePoster } alt = "Slide"/>
            //             <Carousel.Caption>
            //                 <h3> { this.state.eigthMovieTitle } </h3>
            //             </Carousel.Caption>
            //         </Carousel.Item>
            //     </Carousel>
            // </div>
            <div className = "container" style = { { textAlign : "center" } }>
                <div className = "row">
                    <div className = "col-lg-4">
                        Why
                    </div>
                    <div className = "col-lg-4">
                        Hello 
                    </div>
                    <div className = "col-lg-4">
                        There
                    </div>
                </div>
                <div className = "row">
                    <div className = "col-lg-4">
                        Why
                    </div>
                    <div className = "col-lg-4">
                        Hello
                    </div>
                    <div className = "col-lg-4">
                        There
                    </div>
                </div>
                <div className = "row">
                    <div className = "col-lg-4">
                        Why
                    </div>
                    <div className = "col-lg-4">
                        Hello
                    </div>
                    <div className = "col-lg-4">
                        There
                    </div>
                </div>
            </div>
        );
    }
}