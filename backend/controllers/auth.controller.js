const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// Creates a new user in the database
exports.signup = ( req, res ) => {
  const user = new User( {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8)
  } );

  // Save that new user within the datbase
  user.save( (err, user) => {
    if ( err ) {
      res.status( 500 ).send( { message: err } );
      return;
    }
  });
};

// Allows a user to sign in to the database
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .exec( ( err, user ) => {
      if ( err ) {
        res.status( 500 ).send( { message: err } );
        return;
      }

      // User cannot be found
      if ( !user ) {
        return res.status( 404 ).send( { message: "User Not found." } );
      }

      // Compare given password to one in database using bcryptjs
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if ( !passwordIsValid ) {
        return res.status( 401 ).send( {
          accessToken: null,
          message: "Invalid Password!"
        } );
      }

      // Generate a token using jsonwebtoken
      var token = jwt.sign( { id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      } );

      res.status(200).send({
        id: user._id,
        username: user.username,
        accessToken: token
      });
    });
};