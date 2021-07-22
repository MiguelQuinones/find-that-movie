const mongoose = require( "mongoose" );

const WatchLater = mongoose.model(
  "WatchLater",
  new mongoose.Schema( {
    userID : String,
    movieTitle : String,
    moviePoster : String,
  } )
);

module.exports = WatchLater;