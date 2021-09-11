// This file holds the code for the navbar displayed on each page

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
import SearchedMoviePage from './searchedMoviePage';

// Styling rules for Light/Dark mode
// const THEME_KEY = "THEME";
// const LIGHT_THEME_HEX = "#E2E8F0";
// const DARK_THEME_HEX = "#1A202C";
// const THEMES = {
//   Light: LIGHT_THEME_HEX,
//   Dark: DARK_THEME_HEX
// };

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
    // saveSettings( value ) {
    //   window.localStorage.setItem( "THEME", value );
    // }

    // // Retrieve saved theme from web storage -- if no theme has been saved yet, default to light theme
    // if( localStorage ) {
    //   return window.localStorage.getItem( THEME_KEY );
    // }

    // // Changes theme depending on which one user wants to use
    // themeSwitch( theme ) {
    //   document.body.style.backgroundColor = theme;
    //   document.body.style.color = theme === THEMES.Dark ? THEMES.Light : THEMES.Dark;
    //   if( theme === THEMES.Light ) {
    //     document.querySelectorAll( 'h1' ).forEach( ( input ) => {
    //       input.className = "title-light"
    //     } );
    //     document.querySelectorAll( ".card" ).forEach( ( input ) => {
    //       input.className = "card card-light";
    //     } );
    //     document.querySelectorAll( ".card.card-block.mx-2" ).forEach( ( input ) => {
    //       input.className = "card card-block mx-2 card-light";
    //     } );
    //   } else {
    //     document.querySelectorAll( 'h1' ).forEach( ( input ) => {
    //       input.className = "title-dark"
    //     } );
    //     document.querySelectorAll( ".card" ).forEach( ( input ) => {
    //       input.className = "card card-dark";
    //     } );
    //     document.querySelectorAll( ".card.card-block.mx-2" ).forEach( ( input ) => {
    //       input.className = "card card-block mx-2 card-dark";
    //     } );
    //   }
    //   this.saveSettings( theme );
    // }

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

          {/* <div className = "navbar-nav ms-auto">
            <button className = "btn btn-outline-dark active" onClick = { () => this.themeSwitch( THEMES.Dark ) }>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun" viewBox="0 0 16 16">
                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
              </svg>
            </button>
            <button className = "btn btn-outline-dark active" onClick = { () => this.themeSwitch( THEMES.Light ) }>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun-fill" viewBox="0 0 16 16">
                <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
              </svg>
            </button>
          </div> */}
          {/* <div className = "navbar-nav ms-auto">
            <DarkMode />
          </div> */}
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
            <Route exact path = "/searchedMoviePage/:id" component = { SearchedMoviePage } />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Navbar;
