import axios from 'axios';

class AutoLogout {
  constructor() {
    this.logoutTimer = null;
  }

  checkToken = () => {

    const storedJwtToken = sessionStorage.getItem('jwtToken');

    if (storedJwtToken) {
      // Parse the JWT token without using jwt_decode
      const tokenParts = storedJwtToken.split('.');
      const decodedToken = JSON.parse(atob(tokenParts[1]));

      // Get the expiration time from the decoded token
      const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds

      // Calculate the remaining time until expiration
      const currentTime = Date.now();
      const remainingTime = expirationTime - currentTime;

      // // Log the remaining time until expiration
      // console.log(`Remaining time until expiration: ${remainingTime} milliseconds`);

      // Set up a timer to log out the user 5 seconds before the token expires
      this.logoutTimer = setTimeout(() => {
        this.handleLogoutAutomatically(storedJwtToken); // Call your logout function
      }, remainingTime - 60000); // Subtract 5 seconds (5000 milliseconds)
    }
  };

  handleLogoutAutomatically = async (jwtToken) => {
    try {
    const apiUrl = process.env.NEXT_PUBLIC_APP_URL_API;
      // Send a DELETE request to the server
      const response = await axios.delete(`${apiUrl}/api/logout`, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      });
      sessionStorage.removeItem('jwtToken');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('userRole');
      window.location.href = "/Login";
    } catch (error) {
      // Handle errors if the DELETE request fails
      console.error("Error during logout:", error);
    }
  };

  clearLogoutTimer = () => {
    clearTimeout(this.logoutTimer);
  };
}

export default AutoLogout;
