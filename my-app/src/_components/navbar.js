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


  useEffect(() => {
    // Check if userId exists in sessionStorage
    const storedUserId = sessionStorage.getItem('userId');

    if (storedUserId) {
      // userId exists, update your state
      setUserId(storedUserId);
      getUserByID(storedUserId); // Fetch user data when userId is available
    }
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  const handleLogout = async () => {
    try {
      // Send a DELETE request to the server
      const response = await axios.delete(`${apiUrl}/api/logout/${userId}`);
      // Clear userId from sessionStorage
      console.log("Logout Response:", response);
      sessionStorage.removeItem('userId');
      // Update the state to reflect the user is now logged out
      setUserId(null);
      setUser(null); // Clear user data
      redirectToOtherPage();
      setShowDropdown(false); // Close the dropdown
    } catch (error) {
      // Handle errors if the DELETE request fails
      console.error("Error during logout:", error);
    }
  };
  

  const redirectToOtherPage = () => {
    window.location.href = '/';
  };

  const getUserByID = async (id) => {
    try {
      // Check if userId is not null
      if (id) {
        const response = await axios.get(`${apiUrl}/api/users/getUser/${id}`);
        setUser(response.data.user); // Assuming the user data is returned as an object
        console.log("nama : ", response.data.user.nama); // Access the name directly from the response
      } else {
        console.error("userId is null");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
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
