import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/api/test/';

class UserService {
  // For accessing content available to any user -- logged in or not
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  // For accessing content available only to logged in users
  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }
}

export default new UserService();