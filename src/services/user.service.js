import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/api/test/';
const API_URL2 = 'http://localhost:4000/api/watchLater';

class UserService {
  // For accessing content available to any user -- logged in or not
  getPublicContent() {
    return axios.get( API_URL + 'all' );
  }

  // For retrieving a user's Watch Later list
  getWatchLater( userID ) {
    return axios.get( API_URL2 + "/" + userID, { headers : authHeader() } );
  }

  // For adding to a Watch Later list -- might need to add authHeader() here, check later
  addToWatchLater( routeID, userID, title, posterURL ) {
    return axios.post( API_URL2 + "/" + routeID, { userID, title, posterURL } );
  }

  // For removing from the Watch Later list
  removeFromWatchLater( movieID ) {
    return axios.delete( API_URL2 + "/" + movieID, { headers : authHeader() } );
  }
}

export default new UserService();