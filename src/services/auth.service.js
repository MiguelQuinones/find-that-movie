import axios from "axios";

const API_URL = "http://localhost:4000/api/auth/";

class AuthService {
  // Log a user into the application
  login( username, password ) {
    return axios
      .post( API_URL + "signin", {
        username,
        password
      } )
      .then( response => {
        if ( response.data.accessToken ) {
          localStorage.setItem( "user", JSON.stringify(response.data ) );
        }

        return response.data;
      } );
  }

  // Log a user out of the application
  logout() {
    localStorage.removeItem( "user" );
  }

  // Register a new user within the database
  register( username, password ) {
    return axios.post( API_URL + "signup", {
      username,
      password
    } );
  }

  // Get stored user information to check if they are still logged in or not
  getCurrentUser() {
    return JSON.parse( localStorage.getItem( 'user' ) );
  }
}

export default new AuthService();