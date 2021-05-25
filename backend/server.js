// This file performs server functionality -- POSSIBLY REMOVE BODY-PARSER LATER, MOVE PORT TO ENV FILE

// Dependencies needed such as Express and CORS
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = express.Router();
const PORT = 4000;

// Import watchlist and favorites models

// Integrate CORS into the app
app.use(cors());
app.use(bodyParser.json());

// Connect to the MongoDB database moviedb
mongoose.connect('mongodb://127.0.0.1:27017/moviedb', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully!");
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});