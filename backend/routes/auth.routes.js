const { verifyRegister } = require( "../middlewares" );
const controller = require( "../controllers/auth.controller" );

module.exports = function( app ) {
  app.use( function( req, res, next ) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  } );

  // Routes for user authorization -- registering an account and logging into an account
  app.post( "/api/auth/signup", verifyRegister.checkDuplicateUsername, controller.signup );

  app.post( "/api/auth/signin", controller.signin );
};