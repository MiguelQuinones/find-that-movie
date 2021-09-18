// This file holds the code for the navbar displayed on each page

// Necessary imports
import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import AuthService from '../services/auth.service';
import Home from './homePage';
import searchPage from './searchPage';
import watchLater from './watchLater';
import loginPage from './loginPage';
import registerPage from './registerPage';
import SearchedMoviePage from './searchedMoviePage';

class Navbar extends Component {
    constructor( props ) {
      super( props );
      this.logUserOut = this.logUserOut.bind( this );

      this.state = {
        currentUser : undefined
      };
    }

    componentDidMount() {
      // Check to see if user is currently logged in
      const user = AuthService.getCurrentUser();

      // If user is logged in, update the state
      if( user ) {
        this.setState( {
          currentUser : user
        } );
      }
    }

    // Function for logging user out of the application
    logUserOut() {
      AuthService.logout()
    }

    render() {
      const { currentUser } = this.state;
      return (
      <div>
        <nav className = "navbar fixed-top navbar-expand navbar-dark bg-dark" id = "navbar">
          <Link to = { "/" } className = "navbar-brand">
            <span> Find That Movie! </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-reels" viewBox="0 0 16 16">
              <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"/>
              <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z"/>
              <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
            </svg>
          </Link>
          <div className = "navbar-nav mr-auto">
            <li className = "nav-item">
              <Link to = "/"  className = "nav-link" id = "nav-link1">
                Home Page
              </Link>
            </li>
            <li className = "nav-item">
              <Link to = "/searchPage" className = "nav-link" id = "nav-link2">
                Search Page
              </Link>
            </li>
          </div>

          { currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className = "nav-item">
                <Link to = { "/watchLater" } className = "nav-link" id = "nav-link5">
                  { currentUser.username }'s Watchlist
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className = "nav-link" id = "nav-link6" onClick={ this.logUserOut }>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className = "navbar-nav ml-auto">
              <li className = "nav-item">
                <Link to = { "/login" } className = "nav-link" id = "nav-link7">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to = { "/register" } className = "nav-link" id = "nav-link8">
                  Register
                </Link>
              </li>
            </div>
          ) }
        </nav>

        <br></br>
        <br></br>

        <div className = "container mt-3">
          <Switch>
            <Route exact path = "/" component = { Home } />
            <Route exact path = "/searchPage" component = { searchPage } />
            <Route exact path = "/login" component = { loginPage} />
            <Route exact path = "/register" component = { registerPage } />
            <Route exact path = "/watchLater" component = { watchLater } />
            <Route exact path = "/searchedMoviePage/:id" component = { SearchedMoviePage } />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Navbar;
