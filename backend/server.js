// This file performs server functionality -- POSSIBLY REMOVE BODY-PARSER LATER, MOVE PORT TO ENV FILE

// Dependencies needed such as Express and CORS
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = express.Router();

// let corsOptions = {
//     orign : "http://localhost:4000"
// };

// Import user, watchlist, and favorites models
const db = require( "./models" );

// Integrate CORS into the app
app.use( cors( ) );
app.use( bodyParser.json() );

// Connect to the MongoDB database moviedb
mongoose.connect('mongodb://127.0.0.1:27017/moviedb', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully!");
})

const PORT = process.env.PORT || 4000;
app.listen( PORT, () => {
    console.log("Server is running on Port: " + PORT);
} );

// Routing middleware
app.get( "/", ( req, res ) => {
    res.json( { message: "Welcome to the application." } );
} );

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
