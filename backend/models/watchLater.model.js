const mongoose = require("mongoose");

const watchLater = mongoose.model(
  "WatchLater",
  new mongoose.Schema({
    movieTitle: String
  } )
);

module.exports = watchLater;