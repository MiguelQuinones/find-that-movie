// This file holds the code for the navbar displayed on each page, essentially acting
// like a component -- IMPLEMENT ICONS FOR DARK/LIGHT MODE AS WELL AS MORE CSS STYLING FOR SEARCH PAGE WHEN RETURNING

// Necessary imports
import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import AuthService from '../services/auth.service';
import homePage from './homePage';
import searchPage from './searchPage';
import profilePage from './profilePage';
import watchLater from './watchLater';
import favoritePage from './favoritePage';
import loginPage from './loginPage';
import registerPage from './registerPage';
import BoardUser from './board-user.component'
//import '../App.css';

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

      // If user is found
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
      var navbar = document.getElementById( "navbar" );
      if( theme === THEMES.Dark ) {
        navbar.className = "navigationBarDark";
        for( let darkIndex = 1; darkIndex < 10; darkIndex++ ) {
          let darkItem = document.getElementById( "nav-link" + darkIndex );
          if( darkItem ) {
            darkItem.className = "navbarItemDark";
          }
        }
        //darkItem.className = "navbarItemDark";
      } else if( theme === THEMES.Light ) {
        navbar.className = "navigationBarLight";
        for( let lightIndex = 1; lightIndex < 10; lightIndex++ ) {
          let lightItem = document.getElementById( "nav-link" + lightIndex );
          if( lightItem ) {
            lightItem.className = "navbarItemLight";
          }
        }
      }
    }

    render() {
      const { currentUser } = this.state;
      return (
        <div>
        <nav className = "navigationBar" id = "navbar">
          <div className="navbar-nav mr-auto">
            <li className="navbarItem">
              <Link to = "/" id = "nav-link1">
                Home Page
              </Link>
            </li>
            <li className = "navbarItem">
              <Link to = "/searchPage" id = "nav-link2">
                Search Page
              </Link>
            </li>

            {currentUser && (
              <li className="navbarItem">
                <Link to={"/user"} id ="nav-link3">
                  User Board
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="navbarItem">
                <Link to={ "/profile" } id = "nav-link4">
                  { currentUser.username }'s Page
                </Link>
              </li>
              <li className = "navbarItem">
                <Link to = { "/watchLater" } id = "nav-link5">
                  Watch Later
                </Link>
              </li>
              <li className = "navbarItem">
                <Link to = { "/favorites" } id = "nav-link6">
                  Favorites Page
                </Link>
              </li>
              <li className="navbarItem">
                <a href="/login" id = "nav-link7" onClick={this.logUserOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="navbarItem">
                <Link to = { "/login" } id = "nav-link8">
                  Login
                </Link>
              </li>

              <li className="navbarItem">
                <Link to = { "/register" } id = "nav-link9">
                  Register
                </Link>
              </li>
            </div>
          )}

          <div className = "buttonHolder">
            <div className = "themeDark" onClick = { () => this.themeSwitch( THEMES.Dark ) } > Dark </div>
            <div className = "themeLight" onClick = { () => this.themeSwitch( THEMES.Light ) } > Light </div>
          </div>
        </nav>
        <br></br>
        <br></br>

        <div>
          <Switch>
            <Route exact path = "/" component = { homePage } />
            <Route exact path = "/searchPage" component = { searchPage } />
            <Route exact path = "/login" component = { loginPage} />
            <Route exact path = "/register" component = { registerPage } />
            <Route exact path = "/profile" component = { profilePage } />
            <Route exact path = "/watchLater" component = { watchLater } />
            <Route exact path = "/favorites" component = { favoritePage } />
            <Route path = "/user" component = { BoardUser } />
          </Switch>
        </div>
      </div>
      );
    }
}

export default Navbar;
