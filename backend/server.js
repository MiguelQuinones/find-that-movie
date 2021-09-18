// This file performs server functionality

// Dependencies needed such as Express and CORS
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const mongoose = require( 'mongoose' );

// Integrate CORS into the app
app.use( cors( ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended : true } ) );

// Connect to the MongoDB database moviedb
mongoose.connect( 'mongodb://127.0.0.1:27017/moviedb', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once( 'open', function() {
    console.log( "MongoDB database connection established successfully!" );
})

// Required routes for authentication and user interaction purposes
require( './routes/auth.routes' )( app );
require( './routes/user.routes' )( app );

// Run the application off of port 4000 if provided one cannot be found
const PORT = process.env.PORT || 4000;
app.listen( PORT, () => {
    console.log("Server is running on Port: " + PORT);
} );

// Routing middleware
app.get( "/", ( req, res ) => {
    res.json( { message: "Welcome to the application!" } );
} );
