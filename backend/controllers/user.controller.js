const db = require( '../models' );
const WatchLater = db.watchLater;

// Test route for all access -- users that are either logged in or not logged in
exports.allAccess = ( req, res ) => {
    res.status( 200 ).send( "Public Content." );
};
  
// Test route only for users that are logged in
exports.userBoard = ( req, res ) => {
    res.status(200).send( "User Content." );
};

// Retrieves a user's Watch Later list
exports.getWatchLater = ( req, res ) => {
    res.status( 200 ).send( "Watch Later Content" );
}

// Route for adding a movie to a user's Watch Later list -- START HERE WHEN RETURNING
exports.addToWatchLater = ( req, res ) => {
    res.status( 200 ).send( { message : "Added successfully: " + req.body.title } );
}