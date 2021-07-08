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
            <div className = "col-md-12">
                <div className = "card card-container">
                    <img src = "//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                         alt = "profile-img"
                         className = "profile-img-card"
                    />
                    <form onSubmit = { this.onHandleSubmit }>
                        <div className = "form-group">
                            <input type = "text"
                                   className = "form-control"
                                   name = "username"
                                   placeholder = "Enter username"
                                   value = { this.state.username }
                                   onChange = { this.onChangeUsername }
                            />
                        </div>
                        <div className = "form-group">
                            <input type = "password"
                                   className = "form-control"
                                   name = "password"
                                   placeholder = "Enter password"
                                   value = { this.state.password }
                                   onChange = { this.onChangePassword }
                            />
                        </div>
                        <div className = "form-group">
                            <button className = "btn btn-primary"> Login </button>
                        </div>
                        { this.state.message && (
                            <div className = "form-group">
                                <div className = "alert alert-danger" role = "alert">
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