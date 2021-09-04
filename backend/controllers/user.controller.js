
const WatchLater = require( '../models/watchLater.model');

// Test route for all access -- users that are either logged in or not logged in
exports.allAccess = ( req, res ) => {
    res.status( 200 ).send( "Public Content." );
};

// Retrieves a user's Watch Later list
exports.getWatchLater = ( req, res ) => {
    try {
        // Retrieve list by filtering for user's ID
        // Could try using JSON.parse( localStorage.getItem( "user" ) ) instead if I wanted to remove the user's ID from the watchLater route
        WatchLater.find( { userID : req.params.id } ).then(
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
    // Check if movie is already in watchlist first
    WatchLater.findOne( { movieTitle : req.body.title } ).exec( ( err, movie ) => {
        if( err ) {
            res.status( 500 ).send( { message : err } );
            return;
        }

        // Movie is already in watchlist so alert the user
        if( movie ) {
            res.status( 400 ).send( { message : "This movie is already in your watchlist!" } );
            return;
        }

        // Movie does not already exist so we add it to the watchlist
        try {
            const watchLater = new WatchLater( {
                userID : req.body.userID,
                movieTitle : req.body.title,
                moviePoster : req.body.posterURL,
                movieID : req.body.movieID
            } );
            // Check if movie is already in watch list -- if not, save it
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

    } );
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