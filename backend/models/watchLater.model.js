const mongoose = require( "mongoose" );

// Mongoose model for movies added to a user's Watch Later list
const WatchLater = mongoose.model(
  "WatchLater",
  new mongoose.Schema( {
    userID : String,
    movieTitle : String,
    moviePoster : String,
    movieID : String
  } )
);

module.exports = WatchLater;