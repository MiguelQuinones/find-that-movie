const mongoose = require("mongoose");

const WatchLater = mongoose.model(
  "WatchLater",
  new mongoose.Schema( {
    user : {
      type : mongoose.Schema.Types.ObjectId,
      required : true
    },
    movieTitle: String
  } )
);

module.exports = WatchLater;