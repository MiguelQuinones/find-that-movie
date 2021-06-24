import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/api/test/';
const API_URL2 = 'http://localhost:4000/api/watchLater';
const API_URL3 = 'http://localhost:4000/api/favorites';

class UserService {
  // For accessing content available to any user -- logged in or not
  getPublicContent() {
    return axios.get( API_URL + 'all' );
  }

  // For accessing content available only to logged in users
  getUserBoard() {
    return axios.get( API_URL + 'user', { headers: authHeader() } );
  }

  // For retrieving a user's Watch Later list
  getWatchLater() {
    return axios.get( API_URL2 );
  }

  // For adding to a Watch Later list
  addToWatchLater( user, title ) {
    return axios.post( API_URL2, { user, title } );
  }

  // For removing from the Watch Later list
  removeFromWatchLater( movieID ) {
    return axios.delete( API_URL2 + "/" + movieID );
  }

  // For allowing a user to add a movie title to their favorites page
  addToFavorites() {
    alert( "Added to favorites!" );
    return axios.post( API_URL3 );
  }
}

export default new UserService();