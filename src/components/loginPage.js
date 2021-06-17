// This file holds the code for allowing users to login to the application -- ADD MORE WHEN RETURNING TO PROJECT

import React, { Component } from 'react';
import AuthService from '../services/auth.service';

export default class loginPage extends Component {

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
            password : "",
            message : ""
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

        // Check if either field was left empty -- if not, move on to loggin user in
        if( this.state.username && this.state.password ) {
            AuthService.login( this.state.username, this.state.password )
            .then( () => {
                this.props.history.push( '/profile' );
                window.location.reload();
            },
            error => {
                const resMessage = ( 
                    error.response && error.response.data && error.response.data.message
                ) || error.message || error.toString();
                this.setState( {
                    message : resMessage 
                } );
            } )
        } else {
        alert( "Fields cannot be left empty!" );
        }
    }

    render() {
        return (
            <div>
                <h1> Login </h1>
                <div className = "formField">
                    <form className = "form" onSubmit = { this.onHandleSubmit }>
                        <input type = "text" className = "loginInput" 
                               placeholder = "Enter username" value = { this.state.username } 
                               onChange = { this.onChangeUsername } />
                        <input type = "password" className = "loginInput" 
                               placeholder = "Enter password" value = { this.state.password } 
                               onChange = { this.onChangePassword } />
                        <button type = "submit" className = "submitLoginButton"> Login </button> 
                    </form>
                </div>
                <p id = "errorMessage"> { this.state.message } </p>
            </div>
        )
    }
}