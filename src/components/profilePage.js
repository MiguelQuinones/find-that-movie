// This file holds the code for allowing users to login to the application -- ADD MORE WHEN RETURNING TO PROJECT

import React, { Component } from 'react';
import AuthService from '../services/auth.service';

export default class profilePage extends Component {

    // Constructor
    constructor( props ) {
        super( props );

        // Setting default state of values
        this.state = {
            currentUser : AuthService.getCurrentUser()
        };
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div>
                <h1> { currentUser.username }'s Profile </h1>
                <div className = "userField">
                    <p>
                        <strong> Token: </strong> { " " }
                        { currentUser.accessToken.substring( 0, 20 ) } ... { " " }
                        { currentUser.accessToken.substr( currentUser.accessToken.length - 20) }
                    </p>
                    <p>
                        <strong> Id: </strong> { " " }
                        { currentUser.id }
                    </p>
                </div>
            </div>
        )
    }
}