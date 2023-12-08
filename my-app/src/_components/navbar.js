"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Navbar(props) {
  const [userId, setUserId] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_APP_URL_API;
  useEffect(() => {
    // Check if userId exists in sessionStorage
    const storedUserId = sessionStorage.getItem('userId');

    if (storedUserId) {
      // userId exists, update your state
      setUserId(storedUserId);
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
      redirectToOtherPage();
    } catch (error) {
      // Handle errors if the DELETE request fails
      console.error("Error during logout:", error);
    }
  };

  const redirectToOtherPage = () => {
    window.location.href = '/'; 
  };


  return (
    <nav className="absolute top-0 w-full z-50 ">
       <div className="md:container mx-auto flex flex-col md:flex-row py-5 items-center justify-start   md:justify-between">
        <div id="brand" className="mb-4 md:mb-0 border-2">
          <a href="/" className="text-red text-3xl font-black font-Title">
            Dondar
          </a>
        </div>
        <div
          id="items"
          className={["font-Subtitle font-regular md:visible collapse", props.itemsColor].join(
            " "
          )}
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
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red text-white font-bold rounded-full ml-4"
            >
              Logout
            </button>
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