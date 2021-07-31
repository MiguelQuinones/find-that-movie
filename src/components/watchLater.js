// This page will contain the table of movies marked "Watch Later" by the user

import React, { Component } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

// Fill in info for table row
const TableRow = props => (
  <tr>
    <td className = "movieTitle"> { props.movie.movieTitle } </td>
    <td> <a href= { "https://image.tmdb.org/t/p/w400" + props.movie.moviePoster }> Link </a> </td>
    <td className = "deleteButton"> <button type = "submit" onClick = { () => {
      UserService.removeFromWatchLater( props.movie._id );
      window.location.reload();
    } }> Remove </button> </td>
  </tr>
)

export default class WatchLater extends Component {
  constructor( props ) {
    super(props);

    this.state = {
      watchListArray : [],
      message : "",
      currentUser : AuthService.getCurrentUser()
    };
  }

  // Retrieve the user's Watch Later list to display it or display the error if one occurs
  componentDidMount() {
    UserService.getWatchLater( this.state.currentUser.id ).then(
      response => {
        this.setState( {
          watchListArray: response.data
        } );
      },
      error => {
        this.setState( {
          message:
            ( error.response && error.response.data) ||
            error.message ||
            error.toString()
        } );
      }
    );
  }

  // Function for mapping the Watch Later list to a table
  mapList() {
    return this.state.watchListArray.map( ( currentMovie, index ) => {
      return < TableRow movie = { currentMovie } key = { index } />;
    } );
  }

  render() {
    const movieData = this.state.watchListArray;
    return (
      // <div>
      //   <header>
      //     <h1> { this.state.currentUser.username }'s Watch Later List </h1>
      //   </header>
      //   { this.state.watchListArray.length === 0 ? (
      //     <p style = { { textAlign : "center" } }> Watchlist is currently empty. You can add to it by searching for a movie
      //         and using the corresponding button!
      //     </p>
      //   ) : (
      //     <p>
      //   <table className = "table table-striped table-bordered border-dark table-hover">
      //       <thead className = "thead-dark">
      //         <tr>
      //           <th scope = "col" style = { { textAlign : "center" } }> Title </th>
      //           <th scope = "col" style = { { textAlign : "center" } }> Poster Link </th>
      //           <th scope = "col" style = { { textAlign : "center" } }> Remove from List </th>
      //         </tr>
      //       </thead>
      //       <tbody style = { { textAlign : "center" } }>
      //         { this.mapList() }
      //       </tbody> 
      //     </table>
      //   </p>
      //   ) }
      //   <br></br>
      //   <br></br>
      //   <p> { this.state.message } </p>
      // </div>
      <div className = "col-md-12">
        <h1 className = "title"> { this.state.currentUser.username }'s Watchlist </h1>
        { this.state.watchListArray.length === 0 ? (
          <div>
            <p style = { { textAlign : "center" } }> Watchlist is currently empty. You can add to it by searching for a movie and using the 
                                                     corresponding button! 
            </p>
          </div>
        ) : (
          <div className = "d-flex flex-row flex-nowrap overflow-auto">
            { movieData.map( data => (
              <div className = "results" key = { data.id }>
                <div className = "card card-block mx-2" style = { { minWidth : "300px" } }>
                  <h1> { data.movieTitle } </h1>
                  <img src = { "https://image.tmdb.org/t/p/w400" + data.moviePoster } alt = "Movie Poster"></img>
                  <br></br>
                  <button type = "submit" className = "btn btn-primary" onClick = { () => {
                    UserService.removeFromWatchLater( data._id);
                    window.location.reload();
                  } }> Remove from List </button> 
                </div>
              </div>
            ) ) }
          </div>
        ) }
      </div>
    );
  }
}