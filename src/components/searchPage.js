// This page will host the search bar and the table displaying movie info

// Necessary imports
import React, { Component } from 'react';

export default class searchPage extends Component {
    render() {
        return (
            <div className = "form">
                <form>
                    <div className = "enterField">
                        <h1> Search Page </h1>
                        <label> Enter Movie Title: </label>
                        <input type = "text"
                               className = "enterField"
                               placeholder = "Enter movie here!" />
                    </div>
                </form>
            </div>
        )
    }
}