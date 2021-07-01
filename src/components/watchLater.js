// This page will contain the table of movies marked "Watch Later" by the user

import React, { Component } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

// Fill in info for table row
const TableRow = props => (
  <tr>
    <td className = "movieTitle"> { props.movie.movieTitle } </td>
    <td className = "deleteButton"> <button type = "submit" onClick = { () => {
      UserService.removeFromWatchLater( props.movie._id );
      window.location.reload();
    } }> Delete </button> </td>
    <td> { props.movie._id } </td>
    <td> { props.movie.movieTagline } </td>
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
        console.log( this.state.watchListArray );
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
    return (
      <div>
        <header>
          <h1> { this.state.currentUser.username }'s Watch Later List </h1>
        </header>
        { this.state.watchListArray.length === 0 ? (
          <p> Watchlist is currently empty. You can add to it by searching for a movie
              and using the corresponding button!
          </p>
        ) : (
          <p>
        <table>
            <thead>
              <tr>
                <th> Title </th>
                <th> Delete </th>
                <th> ID </th>
                <th> Tagline </th>
              </tr>
            </thead>
            <tbody>
              { this.mapList() }
            </tbody> 
          </table>
        </p>
        ) }
        <br></br>
        <br></br>
        <p> { this.state.message } </p>
      </div>
    );
  }
}