"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import HeroSection from "./HeroSection";
import TutorialSingkatSection from "./TutorialSingkatSection";
import InformasiPendonorSection from "./InfomasiPendonorSection";
import ArticleSection from "./ArticleSection";
import Footer from "@/_components/footer";
import Loading from "@/_components/Loading/Loading";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [token,setToken] = useState(null);

    useEffect(() => {
      const storedUserId = sessionStorage.getItem('jwtToken');
    
      if (storedUserId) {
        // userId exists, update your state
        setToken(storedUserId);
    
        try {
          // Parse the JWT token without using jwt_decode
          const tokenParts = storedUserId.split('.');
          const decodedToken = JSON.parse(atob(tokenParts[1]));
    
          // Get the expiration time from the decoded token
          const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
    
          // Calculate the remaining time until expiration
          const currentTime = Date.now();
          const remainingTime = expirationTime - currentTime;
    
          // Set up a timer to log out the user 5 seconds before the token expires
          const logoutTimer = setTimeout(() => {
            handleLogoutOtomatis(storedUserId); // Call your logout function
          }, remainingTime - 60000);
    
          // Cleanup the timer to avoid memory leaks
          return () => clearTimeout(logoutTimer);
        } catch (error) {
          console.error('Error decoding JWT token:', error);
          // Handle the error as needed, e.g., force logout
          handleLogoutOtomatis(storedUserId);
        }
      }
  }, []);
  
  
    const handleLogoutOtomatis = async (jwtToken) => {
      try {
          // Send a DELETE request to the server
          const response = await axios.delete(`${apiUrl}/api/logout`, {
              headers: {
                  'Authorization': `Bearer ${jwtToken}`
              }
          });
          // Clear userId from sessionStorage
          sessionStorage.removeItem('jwtToken');
          // Update the state to reflect the user is now logged out
          setUserId(null);
          redirectToOtherPage();
          setShowDropdown(false); // Close the dropdown
      } catch (error) {
          // Handle errors if the DELETE request fails
          console.error("Error during logout:", error);
          if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.error("Error response data:", error.response.data);
              console.error("Error response status:", error.response.status);
              console.error("Error response headers:", error.response.headers);
          } else if (error.request) {
              // The request was made but no response was received
              console.error("No response received:", error.request);
          } else {
              // Something happened in setting up the request that triggered an Error
              console.error("Error during request setup:", error.message);
          }
      }
    };

    useEffect(() => {
        // Simulate a delay (e.g., API request)
        const delay = setTimeout(() => {
            setLoading(false);
        }, 1500);

        // Update progress every 50ms until it reaches 100%
        const progressInterval = setInterval(() => {
            setProgress((prevProgress) =>
                prevProgress < 100 ? prevProgress + 1 : prevProgress,
            );
        }, 50);

        // Cleanup the timeout and interval to avoid memory leaks
        return () => {
            clearTimeout(delay);
            clearInterval(progressInterval);
        };
    }, []);

    const sections = [
        <HeroSection />,
        <TutorialSingkatSection />,
        <InformasiPendonorSection />,
        <ArticleSection />,
        <Footer />,
    ];

    return (
        <DashboardLayout>
            <div className="w-[100%]overflow-x-hidden">
                <div>
                    {loading ? (
                        <Loading progress={progress} />
                    ) : (
                        sections.map((section, index) => (
                            <React.Fragment key={index}>
                                {section}
                            </React.Fragment>
                        ))
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
