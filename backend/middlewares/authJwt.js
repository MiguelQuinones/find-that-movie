// This file holds the code for checking if a user has a JWT or not
const jwt = require( "jsonwebtoken" );
const config = require( "../config/auth.config.js" );

function verifyToken( req, res, next ) {
  let token = req.headers["x-access-token"];

  if ( !token ) {
    return res.status( 403 ).send( { message: "No token provided!" } );
  }

  jwt.verify( token, config.secret, ( err, decoded ) => {
    if ( err ) {
      return res.status( 401 ).send( { message: "Unauthorized!" } );
    }
    req.userId = decoded.id;
    next();
  } );
};

const authJwt = {
  verifyToken
};

module.exports = authJwt;