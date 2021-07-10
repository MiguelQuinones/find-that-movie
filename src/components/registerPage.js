// This file holds the code for allowing users to register within the application -- ADD MORE WHEN RETURNING TO PROJECT

import React, { Component } from 'react';
import AuthService from '../services/auth.service';

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
            password : "",
            message : "",
            usernameMessage : "",
            passwordMessage : "",
            successful : false
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

        this.setState( {
            message : "",
            usernameMessage : "",
            passwordMessage : "",
            successful : false
        } );

        // Check username to make sure it is valid
        const username = this.state.username;
        let verifiedUsername = "";
        if( !username ) {
            this.setState( { usernameMessage : "Username field cannot be empty!" } );
        } else if( username.length < 3 || username.length > 20 ) {
            this.setState( { usernameMessage : "Username must be longer than 3 characters and shorter than 20 characters!" } );
        } else { verifiedUsername = username; }

        // Check password to make sure it is valid
        const password = this.state.password;
        let verifiedPassword = "";
        if( !password ) {
            this.setState( { passwordMessage : "Password field cannot be empty!" } );
        } else if( password.length < 6 || password.length > 20 ) {
            this.setState( { passwordMessage : "Password must be longer than 6 characters and shorter than 20 characters!" } );
        } else { verifiedPassword = password ;}

        // If both are valid, register user within database
        if( verifiedUsername && verifiedPassword ) {
            // Use AuthService to send username and password to database
            AuthService.register( verifiedUsername, verifiedPassword )
            .then( response => {
                this.setState( {
                    message : response.data.message,
                    successful : true
                } );
            },
            error => {
                const resMessage = (
                    error.response && error.response.data && error.response.data.message
                ) || error.message || error.toString();
                this.setState( {
                    message : resMessage,
                    successful : false
                } );
            } )
            
        }
    }

    render() {
        return (
            <div className = "col-md-12">
                <div className = "card card-container">
                    <h1 className = "card-title"> Register Page </h1>
                    <img src = "//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                         alt = "profile-img"
                         className = "card-img-profile"
                    />
                    <form onSubmit = { this.onHandleSubmit }>
                        <div className = "form-group">
                            <label htmlFor = "username"> Username </label>
                            <input type = "text"
                                   className = "form-control"
                                   name = "username"
                                   placeholder = "Enter username"
                                   value = { this.state.username }
                                   onChange = { this.onChangeUsername }
                            />
                        </div>
                        { this.state.usernameMessage && (
                            <div className = "form-group">
                                <div className = "alert alert-danger" role = "alert">
                                    { this.state.usernameMessage }
                                </div>
                            </div>
                        ) }
                        <div className = "form-group">
                            <label htmlFor = "password"> Password </label>
                            <input type = "password"
                                   className = "form-control"
                                   name = "password"
                                   placeholder = "Enter password"
                                   value = { this.state.password }
                                   onChange = { this.onChangePassword }
                            />
                        </div>
                        { this.state.passwordMessage && (
                            <div className = "form-group">
                                <div className = "alert alert-danger" role = "alert">
                                    { this.state.passwordMessage }
                                </div>
                            </div>
                        ) }

                        <br></br>

                        <div className = "d-grid gap-2">
                            <button className = "btn btn-primary"> Sign Up </button>
                        </div>

                        <br></br>

                        { this.state.message && (
                            <div className = "form-group">
                                <div className = {
                                    this.state.successful ? "alert alert-success" : "alert alert-danger"
                                } role = "alert">
                                    { this.state.message }
                                </div>
                            </div>
                        ) }
                    </form>
                </div>
            </div>
        )
    }
}