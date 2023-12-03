"use client";
// Import necessary modules
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar(props) {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Check if userId exists in sessionStorage
    const storedUserId = sessionStorage.getItem('userId');

    if (storedUserId) {
      // userId exists, update your state
      setUserId(storedUserId);
    }
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  const handleLogout = () => {
    // Clear userId from sessionStorage
    sessionStorage.removeItem('userId');
    // Update the state
    setUserId(null);

    // Additional logic for logging out, e.g., redirect to the login page
    // window.location.href = '/Login';
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
          <Link href="/FormPengajuan" passHref>
            <a className="px-[15px] py-[15px] relative after:absolute hover:after:border-b-2 after:border-red after:w-full after:h-full after:left-0 after:bottom-0">
              Kebutuhan
            </a>
          </Link>
          <Link href="/forum" passHref>
            <a className="px-[15px] py-[15px] relative after:absolute hover:after:border-b-2 after:border-red after:w-full after:h-full after:left-0 after:bottom-0">
              Forum
            </a>
          </Link>
          <Link href="" passHref>
            <a className="px-[15px] py-[15px] relative after:absolute hover:after:border-b-2 after:border-red after:w-full after:h-full after:left-0 after:bottom-0">
              Tentang
            </a>
          </Link>
          {userId ? (
            // Render Logout button or whatever you need for logged-in state
            <button onClick={handleLogout}>Logout</button>
          ) : (
            // Render Login button or whatever you need for logged-out state
            <Link href="/Login" passHref>
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
