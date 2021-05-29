/* This file holds the code that verifies if a username being used to
   register an account has already been taken or not */

const db = require("../models");
const User = db.user;

function checkDuplicateUsername( req, res, next ) {
  // Check if username already exists
  User.findOne( {
    username: req.body.username
  } ).exec( ( err, user ) => {
    if ( err ) {
      res.status( 500 ).send( { message: err } );
      return;
    }

    if ( user ) {
      res.status( 400 ).send( { message: "Failed! Username is already in use!" } );
      return;
    }

      next();
    } );
};

const verifyRegister = {
  checkDuplicateUsername
};

module.exports = verifyRegister;