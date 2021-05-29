// This file holds the code for the navbar displayed on each page, essentially acting
// like a component -- IMPLEMENT ICONS FOR DARK/LIGHT MODE AS WELL AS MORE CSS STYLING FOR SEARCH PAGE WHEN RETURNING

// Necessary imports
import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import AuthService from '../services/auth.service';
import homePage from './homePage';
import searchPage from './searchPage';
import watchLater from './watchLater';
import favoritePage from './favoritePage';
import loginPage from './loginPage';
import registerPage from './registerPage';
import BoardUser from './board-user.component'

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
        for( var darkIndex = 1; darkIndex < 6; darkIndex++ ) {
          var darkItem = document.getElementById( "navbarItem" + darkIndex );
          darkItem.className = "navbarItemDark";
        }
      } else if( theme === THEMES.Light ) {
        navbar.className = "navigationBarLight";
        for( var lightIndex = 1; lightIndex < 6; lightIndex++ ) {
          var lightItem =document.getElementById( "navbarItem" + lightIndex );
          lightItem.className = "navbarItemLight";
        }
      }
    }

    // START HERE WHEN RETURNING
    render() {
      const { currentUser } = this.state;
      return (
        <div>
        <nav className = "navigationBar">
          <Link to = "/" className="navbarItem">
            Home
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to = "/homePage" className="nav-link">
                Home Page
              </Link>
            </li>

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={ ["/", "/home"] } component = { homePage } />
            <Route exact path="/login" component = { loginPage} />
            <Route exact path="/register" component={ registerPage } />
            <Route path="/user" component={BoardUser} />
          </Switch>
        </div>
      </div>
      );
    }
}

export default Navbar;
