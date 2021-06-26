
const WatchLater = require( '../models/watchLater.model');

// Test route for all access -- users that are either logged in or not logged in
exports.allAccess = ( req, res ) => {
    res.status( 200 ).send( "Public Content." );
};
  
// Test route only for users that are logged in
exports.userBoard = ( req, res ) => {
    res.status(200).send( "User Content." );
};

// Retrieves a user's Watch Later list -- START HERE WHEN RETURNING -- WORK ON FINDING BY USER ID
exports.getWatchLater = ( req, res ) => {
    //console.log( req.params.id ); // It does successfully get user ID
    try {
        // WatchLater.find( { userID : req.params.id } ) -- WILL NEED TO LOOK LIKE THIS PROBABLY
        WatchLater.find(  ).then(
            ( movies ) => {
                res.status( 200 ).json( movies );
            }
        ).catch( 
            ( err ) => {
                res.status( 400 ).send( "Error occurred..." );
            }
        )
    } 
    catch( err ) {
        console.error( err.message );
        res.status( 500 ).send( "There was a server error when retrieving the list..." );
    }
};

// Route for adding a movie to a user's Watch Later list
exports.addToWatchLater = ( req, res ) => {
    try {
        const watchLater = new WatchLater( {
            userID : req.body.userID,
            movieTitle : req.body.title
        } );
        // Save the movie to the Watch Later list
        watchLater.save().then(
            () => {
                res.status( 200 ).send( { message : "Movie added to Watch List!" } );
            }
        ).catch(
            ( err ) => {
                res.status( 500 ).send( { message : "An error occurred..." } );
            }
        )
    } 
    catch( err ) {
        res.status( 500 ).send( { message : err } );
    }
};

// Route for deleting a movie from the Watch Later list
exports.removeFromWatchLater = ( req, res ) => {
    try {
        WatchLater.findOneAndRemove(  { _id : req.params.id } , ( err ) => {
            if( err ) {
                console.log( err );
            }
        } );
        res.json( "Movie removed from list!" );

    } catch( err ) {
        res.status( 500 ).send( err );
    }
}