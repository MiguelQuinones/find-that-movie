export default function authHeader() {
    // Check localstorage to see if there is a logged in user with an access token
    const user = JSON.parse( localStorage.getItem( 'user' ) );
  
    if ( user && user.accessToken ) {
      return { 'x-access-token' : user.accessToken };
    } else {
      return {};
    }
  }