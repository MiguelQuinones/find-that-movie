// This file holds the code for allowing users to register within the application -- ADD MORE WHEN RETURNING TO PROJECT

import React, { Component } from 'react';

export default class registerPage extends Component {

    // Constructor
    constructor( props ) {
        super( props );

        // Binding functions
        this.onChangeUsername = this.onChangeUsername.bind( this );
        this.onChangePassword = this.onChangePassword.bind( this );
        this.onHandleSubmit = this.onHandleSubmit.bind( this );

        // Setting default state of values
        this.state = {
            username : "",
            password : ""
        }
    }

    // Keep track of the state of the username being entered
    onChangeUsername( event ) {
        this.setState( {
            username : event.target.value
        } );
    }

    // Keep track of the state of the password being entered
    onChangePassword( event ) {
        this.setState( {
            password : event.target.value
        } );
    }

    // Call when submitting form -- takes user inputs and sends to server for storage
    onHandleSubmit( event ) {
        event.preventDefault();

        // Display username and password to screen for now -- IMPLEMENT ACTUAL PROTOCOLS WHEN RETURNING
        //alert( "Username: " + this.state.username + ", Password: " + this.state.password );

        // Log user into application -- ADD VALIDATION WHEN RETURNING
        // Check username to make sure it is valid
        const username = this.state.username;
        if( !username ) {
            alert( "Username field cannot be empty!" );
        } else if( username.length < 3 || username.length > 20 ) {
            alert( "Username must be longer than 3 characters and shorter than 20 characters!" );
        }

        // Check password to make sure it is valid
        const password = this.state.password;
        if( !password ) {
            alert( "Password field cannot be empty!" );
        } else if( password.length < 6 || password.length > 20 ) {
            alert( "Password must be longer than 6 characters and shorter than 20 characters!" );
        }

        // If both are valid, register user within database
        if( username && password ) {
            alert( "Username: " + username + ", Password: " + password );

        }
    }

    render() {
        return (
            <div>
                <h1> Register </h1>
                <div className = "formField">
                    <form className = "form" onSubmit = { this.onHandleSubmit }>
                        <input type = "text" className = "loginInput" 
                               placeholder = "Enter username" value = { this.state.username } 
                               onChange = { this.onChangeUsername } />
                        <input type = "text" className = "loginInput" 
                               placeholder = "Enter password" value = { this.state.password } 
                               onChange = { this.onChangePassword } />
                        <button type = "submit" className = "submitLoginButton"> Login </button> 
                    </form>
                </div>
            </div>
        )
    }
}