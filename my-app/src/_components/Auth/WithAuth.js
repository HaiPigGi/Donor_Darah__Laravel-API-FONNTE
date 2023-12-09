import { useEffect } from 'react';

const withAuth = (WrappedComponent, allowedRoles) => {
  const Auth = (props) => {
    const redirectToOtherPage = () => {
      window.location.href = '/Login';
    };

    useEffect(() => {
      // Check if user is authenticated
      const token = sessionStorage.getItem('jwtToken');

      if (!token) {
        // Redirect to login page if not authenticated
        redirectToOtherPage();
      } else {
        // Check if the user has the required role
        const userRole = sessionStorage.getItem('userRole');
        
        if (!allowedRoles.includes(userRole)) {
          // Redirect to unauthorized page if the user doesn't have the required role
          window.location.href = '/Unauthorized';
        }
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;
