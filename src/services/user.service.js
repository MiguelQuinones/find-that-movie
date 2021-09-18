import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/api/watchLater';

class UserService {

  // For retrieving a user's Watch Later list
  getWatchLater( userID ) {
    return axios.get( API_URL + "/" + userID, { headers : authHeader() } );
  }

  // For adding to a Watch Later list -- might need to add authHeader() here, check later
  addToWatchLater( routeID, userID, title, posterURL, movieID ) {
    return axios.post( API_URL + "/" + routeID, { userID, title, posterURL, movieID } );
  }

  // For removing from the Watch Later list
  removeFromWatchLater( movieID ) {
    return axios.delete( API_URL + "/" + movieID, { headers : authHeader() } );
  }
}

export default new UserService();