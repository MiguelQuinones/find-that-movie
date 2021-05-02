// FIGURE OUT HOW TO ADD SLIDING IMAGES OF UPCOMING MOVIES HERE -- FOLLOW SAVED EXAMPLE ON REDDIT

import React, { Component } from 'react';

export default class homePage extends Component {
    render() {
        return (
            <div>
                <h1> Movie Finder Application</h1>
                <h2> About the Search Page </h2>
                <p> This page allows you to enter a movie title and receive information
                    about that movie. Displayed information includes actors, director, genres,
                    the poster and trailer if available, and more! </p>
                <h2> About the Watch Later Page </h2>
                <p> This page will display a table of movies that you mark as "Watch Later". </p>
                <h2> About the Favorites Page </h2>
                <p> This page will display a table of movies that you mark as "Favorite". </p>
            </div>
        )
    }
}