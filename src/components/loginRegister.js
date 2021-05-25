// This file holds the code for allowing users to register for / login to the application -- ADD MORE WHEN RETURNING TO PROJECT

import React, { Component } from 'react';

export default class watchLater extends Component {

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
        alert( "Username: " + this.state.username + ", Password: " + this.state.password );
    }

    render() {
        return (
            <div>
                <h1> Login / Register </h1>
                <div className = "formField">
                    <form className = "form" onSubmit = { this.onHandleSubmit }>
                        <input type = "text" className = "input" 
                               placeholder = "Enter username" value = { this.state.username } 
                               onChange = { this.onChangeUsername } />
                        <input type = "text" className = "input" 
                               placeholder = "Enter password" value = { this.state.password } 
                               onChange = { this.onChangePassword } />
                        <button type = "submit" className = "submitButtons" value = "Login/Register" > 
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}