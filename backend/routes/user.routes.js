const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function( app ) {
  app.use( function( req, res, next ) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  } );

  app.get( "/api/test/all", controller.allAccess );

  app.get( "/api/test/user", [ authJwt.verifyToken ], controller.userBoard );

  // Route for retrieving the Watch Later list
  //app.get( "/api/watchLater", controller.getWatchLater );

  // Route for adding to the Watch Later list
  app.post( "/api/watchLater", controller.addToWatchLater );
};