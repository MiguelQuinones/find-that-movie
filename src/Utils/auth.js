// This file will manage session and token info for users

// Return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem( 'user' );
    if ( userStr ) {
      return JSON.parse(userStr);
    } else {
      return null;
    }
  }
  
  // Return the token from the session storage
  export const getToken = () => {
    return sessionStorage.getItem( 'token' ) || null;
  }
  
  // Remove the token and user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem( 'token' );
    sessionStorage.removeItem( 'user' );
  }
  
  // Set the token and user from the session storage
  export const setUserSession = ( token, user ) => {
    sessionStorage.setItem( 'token', token );
    sessionStorage.setItem( 'user', JSON.stringify( user ) );
  }