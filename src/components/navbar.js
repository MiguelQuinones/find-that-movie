// This file holds the code for the navbar displayed on each page, essentially acting
// like a component -- IMPLEMENT ICONS FOR DARK/LIGHT MODE AS WELL AS MORE CSS STYLING FOR SEARCH PAGE WHEN RETURNING

// Necessary imports
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import homePage from './homePage';
import searchPage from './searchPage';
import watchLater from './watchLater';
import favoritePage from './favoritePage';

// Styling rules for Light/Dark mode
const THEME_KEY = "THEME";
const LIGHT_THEME_HEX = "#E2E8F0";
const DARK_THEME_HEX = "#1A202C";
const THEMES = {
  Light: LIGHT_THEME_HEX,
  Dark: DARK_THEME_HEX
};

class Navbar extends Component {
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
      // Change theme of table to match -- if table exists on page, performs the changes
      var tableSwitch = document.getElementById( "table" );
      if( tableSwitch ) {
        if( theme === THEMES.Dark ) {
          tableSwitch.className = "table table-striped table-bordered table-hover table-dark"
        } else if( theme === THEMES.Light ) {
          tableSwitch.className = "table table-striped table-bordered table-hover"
        }
      }
      // Change theme of navbar to match
      var navbar = document.getElementById( "navbar" );
      if( theme === THEMES.Dark ) {
        navbar.className = "navigationBarDark";
        for( var darkIndex = 1; darkIndex < 5; darkIndex++ ) {
          var darkItem = document.getElementById( "navbarItem" + darkIndex );
          darkItem.className = "navbarItemDark";
        }
      } else if( theme === THEMES.Light ) {
        navbar.className = "navigationBarLight";
        for( var lightIndex = 1; lightIndex < 5; lightIndex++ ) {
          var lightItem =document.getElementById( "navbarItem" + lightIndex );
          lightItem.className = "navbarItemLight";
        }
      }
    }

    // Rendering for the landing page
    render() {
      return (
        <Router>
            <div className = "app">
              <nav className = "navigationBar">
                <div className = "navigationBarList">
                  <ul id = "navbar" className = "unorderedList">
                    <li className = "navbarItem">
                      <Link to = "/" id = "navbarItem1" className = "navbarItemOne"> Home Page </Link>
                    </li>
                    <li className = "navbarItem">
                      <Link to = "/searchPage" id = "navbarItem2" className = "navbarItemTwo"> Search Page</Link>
                    </li>
                    <li className = "navbarItem">
                      <Link to = "/watchLater" id = "navbarItem3" className = "navbarItemThree"> Watch Later Page </Link>
                    </li>
                    <li className = "navbarItem">
                      <Link to = "/favorites" id = "navbarItem4" className = "navbarItemFour"> Favorites Page </Link>
                    </li>
                    <div className = "buttonHolder">
                        <div className = "themeDark" onClick = { () => this.themeSwitch( THEMES.Dark ) } > Dark </div>
                        <div className = "themeLight" onClick = { () => this.themeSwitch( THEMES.Light ) } > Light </div>
                    </div>
                  </ul>
                </div>
              </nav>
              <br/>
              <Route path = "/" exact component = { homePage } />
              <Route path = "/searchPage" component = { searchPage } />
              <Route path = "/watchLater" component = { watchLater } />
              <Route path = "/favorites" component = { favoritePage } />
            </div>
          </Router>
      );
    }
}

export default Navbar;
