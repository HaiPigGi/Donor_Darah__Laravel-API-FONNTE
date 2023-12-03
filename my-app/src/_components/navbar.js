"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Navbar(props) {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    // Check if userId exists in sessionStorage
    const storedUserId = sessionStorage.getItem('userId');
    console.log("id user : ",storedUserId);

    if (storedUserId) {
      // userId exists, update your state
      setUserId(storedUserId);
    }
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  const handleLogout = async () => {
    try {
      // Send a DELETE request to the server
      const response = await axios.delete(`http://localhost:8000/api/logout/${userId}`);
      // Clear userId from sessionStorage
      console.log("Logout Response:", response);
      sessionStorage.removeItem('userId');
      // Update the state to reflect the user is now logged out
      setUserId(null);
    } catch (error) {
      // Handle errors if the DELETE request fails
      console.error("Error during logout:", error);
    }
  };
  

  return (
    <nav className="absolute top-0 w-[100%] z-50">
      <div className="container mx-auto flex py-5 items-center justify-between">
        <div id="brand">
          <a href="/" className="text-red text-3xl font-black font-Title">
            Dondar
          </a>
        </div>
        <div
          id="items"
          className={["font-Subtitle font-regular", props.itemsColor].join(
            " "
          )}
        >
          <a
            href="/FormPengajuan"
            className="px-[15px] py-[15px] relative after:absolute hover:after:border-b-2 after:border-red after:w-full after:h-full after:left-0 after:bottom-0"
          >
            Kebutuhan
          </a>
          <a
            href="/forum"
            className="px-[15px] py-[15px] relative after:absolute hover:after:border-b-2 after:border-red after:w-full after:h-full after:left-0 after:bottom-0"
          >
            Forum
          </a>
          <a
            href=""
            className="px-[15px] py-[15px] relative after:absolute hover:after:border-b-2 after:border-red after:w-full after:h-full after:left-0 after:bottom-0"
          >
            Tentang
          </a>
          {userId ? (
            // Render Logout button or whatever you need for logged-in state
            <button onClick={handleLogout}>Logout</button>
          ) : (
            // Render Login button or whatever you need for logged-out state
            <Link href="/Login" passHref legacyBehavior>
              <a className="px-[20px] py-2 bg-red text-white font-bold rounded-full">
                Login
              </a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
