const mongoose = require( "mongoose" );

const WatchLater = mongoose.model(
  "WatchLater",
  new mongoose.Schema( {
    user : String,
    movieTitle: String
  } )
);

module.exports = WatchLater;