// This file holds the code for the navbar displayed on each page
// IMPLEMENT ICONS FOR DARK/LIGHT MODE AS WELL AS MORE CSS STYLING FOR SEARCH PAGE WHEN RETURNING

// Necessary imports
import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import AuthService from '../services/auth.service';
import Home from './homePage';
import searchPage from './searchPage';
import profilePage from './profilePage';
import watchLater from './watchLater';
import loginPage from './loginPage';
import registerPage from './registerPage';
//import 'bootstrap/dist/css/bootstrap.min.css'; //-- WORK ON IMPLEMENTING THIS WHEN RETURNING

// Styling rules for Light/Dark mode
const THEME_KEY = "THEME";
const LIGHT_THEME_HEX = "#E2E8F0";
const DARK_THEME_HEX = "#1A202C";
const THEMES = {
  Light: LIGHT_THEME_HEX,
  Dark: DARK_THEME_HEX
};

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
    // Saves chosen theme to web storage to persist across pages
    saveSettings( value ) {
      window.localStorage.setItem( THEME_KEY, value );
    }

    // Retrieve saved theme from web storage -- if no theme has been saved yet, default to light theme
    getSettings() {
      return window.localStorage.getItem( THEME_KEY ) ?? THEMES.Light;
    }

    // Changes theme depending on which one user wants to use
    themeSwitch( theme ) {
      document.body.style.backgroundColor = theme;
      document.body.style.color = theme === THEMES.Dark ? THEMES.Light : THEMES.Dark;
      this.saveSettings( theme );

      // Change theme of navbar to match
      // var navbar = document.getElementById( "navbar" );
      // if( theme === THEMES.Dark ) {
      //   navbar.className = "navbar fixed-top navbar-expand navbar-dark bg-dark";
      // } else if( theme === THEMES.Light ) {
      //   navbar.className = "navbar fixed-top navbar-expand navbar-light bg-light";
      // }
    }

    render() {
      const { currentUser } = this.state;
      return (
      <div>
        <nav className = "navbar fixed-top navbar-expand navbar-dark bg-dark" id = "navbar">
          <Link to = { "/" } className = "navbar-brand">
            Navbar
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
              <li className="nav-item">
                <Link to = { "/profile" } className = "nav-link" id = "nav-link4">
                  { currentUser.username }'s Page
                </Link>
              </li>
              <li className = "nav-item">
                <Link to = { "/watchLater" } className = "nav-link" id = "nav-link5">
                  Watch Later
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

          <div className = "navbar-nav ms-auto">
            <li className = "nav-link" onClick = { () => this.themeSwitch( THEMES.Dark ) } > Dark </li>
            <li className = "nav-link" onClick = { () => this.themeSwitch( THEMES.Light ) } > Light </li>
          </div>
        </nav>

        <br></br>
        <br></br>

        <div className = "container mt-3">
          <Switch>
            <Route exact path = "/" component = { Home } />
            <Route exact path = "/searchPage" component = { searchPage } />
            <Route exact path = "/login" component = { loginPage} />
            <Route exact path = "/register" component = { registerPage } />
            <Route exact path = "/profile" component = { profilePage } />
            <Route exact path = "/watchLater" component = { watchLater } />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Navbar;
