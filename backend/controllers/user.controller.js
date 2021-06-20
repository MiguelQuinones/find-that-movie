const db = require( '../models/watchLater.model' );
const WatchLater = db;

// Test route for all access -- users that are either logged in or not logged in
exports.allAccess = ( req, res ) => {
    res.status( 200 ).send( "Public Content." );
};
  
// Test route only for users that are logged in
exports.userBoard = ( req, res ) => {
    res.status(200).send( "User Content." );
};

// Retrieves a user's Watch Later list -- -- START HERE WHEN RETURNING
exports.getWatchLater = ( req, res ) => {
    try {
        const watchLaterList = WatchLater.find( { user: req.body.user } );
        res.json( watchLaterList );
        res.status( 200 ).send( "Successfully retrieved list!" );
    } 
    catch( err ) {
        res.status( 500 ).send( "There was a server error when retrieving the list..." );
    }
}

// Route for adding a movie to a user's Watch Later list
exports.addToWatchLater = ( req, res ) => {
    try {
        let watchLater = new WatchLater( {
            user : req.body.user,
            movieTitle : req.body.title
        } );
        // Add the movie to the Watch Later list
        watchLater.save();
        res.status( 200 ).send( "Movie added to Watch Later list!" );
    } 
    catch( err ) {
        res.status( 500 ).send( err );
    }
}