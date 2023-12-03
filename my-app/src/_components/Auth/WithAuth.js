import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  const Auth = (props) => {

    const redirectToOtherPage = () => {
        window.location.href = '/Login'; 
      };

    useEffect(() => {
      // Check if user is authenticated
      const userId = sessionStorage.getItem('userId');
      if (!userId) {
        // Redirect to login page if not authenticated
        redirectToOtherPage();
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;
