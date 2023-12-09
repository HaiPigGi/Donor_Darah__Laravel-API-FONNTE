"use client";
import { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import Link from "next/link";
import axios from "axios";

export default function Navbar(props) {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_APP_URL_API;
  const [showDropdown, setShowDropdown] = useState(false);
  const [token,setToken] = useState(null);

  useEffect(() => {
    // Check if userId exists in sessionStorage
    const storedUserId = sessionStorage.getItem('jwtToken');
    
    if (storedUserId) {
      // userId exists, update your state
      setUserId(storedUserId);
      getUserByID(storedUserId); // Fetch user data when userId is available
      setToken(storedUserId);

      // Parse the JWT token without using jwt_decode
      const tokenParts = storedUserId.split('.');
      const decodedToken = JSON.parse(atob(tokenParts[1]));
  
      // Get the expiration time from the decoded token
      const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
  
      // Calculate the remaining time until expiration
      const currentTime = Date.now();
      const remainingTime = expirationTime - currentTime;
  
      // Log the remaining time until expiration
      console.log(`Remaining time until expiration: ${remainingTime} milliseconds`);
  
      // Set up a timer to log out the user 5 seconds before the token expires
      const logoutTimer = setTimeout(() => {
        handleLogoutOtomatis(storedUserId); // Call your logout function
      }, remainingTime - 60000); // Subtract 5 seconds (5000 milliseconds)
  
      // Cleanup the timer to avoid memory leaks
      return () => clearTimeout(logoutTimer);
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
  const getUserByID = async (jwtToken) => {
    try {
        // Retrieve the JWT token from your authentication system
        const response = await axios.get(`${apiUrl}/api/users/getUser`, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });

        setUser(response.data.user);
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};
const handleLogout = async () => {
  try {
      // Send a DELETE request to the server
      const response = await axios.delete(`${apiUrl}/api/logout`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      // Clear userId from sessionStorage
      sessionStorage.removeItem('jwtToken');
      // Update the state to reflect the user is now logged out
      setUserId(null);
      setUser(null); // Clear user data
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


  const redirectToOtherPage = () => {
    window.location.href = '/';
  };


  const handleDropdownToggle = (isOpen) => {
    setShowDropdown(isOpen);
  };
  useEffect(() => {
    const handleDocumentClick = (e) => {
      // Cek apakah element yang diklik adalah bagian dari dropdown
      if (e.target.closest("#dropdown-container")) {
        return;
      }
      
      // Jika tidak, tutup dropdown
      setShowDropdown(false);
    };
  
    // Tambahkan event listener pada dokumen
    document.addEventListener("click", handleDocumentClick);
  
    // Membersihkan event listener saat komponen dibongkar
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);
  
  return (
    <nav className="absolute top-0 w-full z-50">
      <div className="md:container mx-auto flex flex-col md:flex-row py-5 items-center justify-start md:justify-between">
        <div id="brand" className="mb-4 md:mb-0 border-2">
          <a href="/" className="text-red text-3xl font-black font-Title">
            Dondar
          </a>
        </div>
        <div
          id="items"
          className={["font-Subtitle font-regular md:visible collapse w-1/2 text-right", props.itemsColor].join(" ")}
        >
          <a
            href="/FormPengajuan"
            className="px-4 py-2 hover:border-b-2 border-red hover:text-red"
          >
            Kebutuhan
          </a>
          <a
            href="/forum"
            className="px-4 py-2 hover:border-b-2 border-red hover:text-red"
          >
            Forum
          </a>
          <a
            href=""
            className="px-4 py-2 hover:border-b-2 border-red hover:text-red"
          >
            Tentang
          </a>
          {userId ? (
            <Dropdown 
            className="inline"
             show={showDropdown}
             onToggle={handleDropdownToggle} >
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="px-4 py-2 bg-red text-white font-bold rounded-full ml-4"
              >
                {user ? `Hello, ${user.nama}` : 'Hello'} {/* Access the name directly from the user state */}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href={'/profile'}>
                   View Profile
                   </Dropdown.Item>
                <br/>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link href="/Login" passHref legacyBehavior>
              <a className="px-4 py-2 bg-red text-white font-bold rounded-full ml-4">
                Login
              </a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
