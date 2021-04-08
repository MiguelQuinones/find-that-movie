// This will act as the landing page for now, might change later

// Necessary imports
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import homePage from './components/homePage';
import searchPage from './components/searchPage';
import watchLater from './components/watchLater';
import favoritePage from './components/favoritePage';

// Rendering for the landing page
function App() {
  return (
    <Router>
        <div className = "app">
          <nav className = "navigationBar">
            <div className = "navigationBarList">
              <ul className = "unorderedList">
                <li className = "navbarItem">
                  <Link to = "/" className = "navbarItemOne"> Home Page </Link>
                </li>
                <li className = "navbarItem">
                  <Link to = "/searchPage" className = "navbarItemTwo"> Search Page</Link>
                </li>
                <li className = "navbarItem">
                  <Link to = "/watchLater" className = "navbarItemThree"> Watch Later Page </Link>
                </li>
                <li className = "navbarItem">
                  <Link to = "/favorites" className = "navbarItemFour"> Favorites Page </Link>
                </li>
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

export default App;
