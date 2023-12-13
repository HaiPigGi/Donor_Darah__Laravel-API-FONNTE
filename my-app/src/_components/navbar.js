"use client";
import { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import Link from "next/link";
import axios from "axios";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function Navbar(props) {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_APP_URL_API;
  const [showDropdown, setShowDropdown] = useState(false);
  const [token,setToken] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  useEffect(() => {
    const storedUserId = sessionStorage.getItem('jwtToken');
  
    if (storedUserId) {
      // userId exists, update your state
      setUserId(storedUserId);
      setToken(storedUserId);
      getUserByID(storedUserId);
  
    }
}, []);
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
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('userRole');
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

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

  return (
    <nav className="absolute top-0 w-full z-50 p-4">
   <div className="md:container mx-auto flex items-center justify-between">
                <div id="brand" className="flex items-center flex-shrink-0 text-white mr-6">
                    <a href="/" className="text-red text-3xl font-black font-Title">Dondar</a>
                </div>
                <div id="items" className={[
                    "font-Subtitle font-regular md:visible collapse w-1/2 text-right",
                    props.itemsColor,
                ].join(" ")}>
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
                href="/tentang"
                className="px-4 py-2 hover:border-b-2 border-red hover:text-red"
            >
                Tentang
            </a>
            {userId ? (
                <Menu
                    as="div"
                    className="relative inline-block text-left"
                >
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-red px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red">
                            {user ? `Hello, ${user.nama}` : "Hello"}
                            <ChevronDownIcon
                                className="-mr-1 h-5 w-5 text-white"
                                aria-hidden="true"
                            />
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="/profile"
                                            className={classNames(
                                                active
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-700",
                                                "block px-4 py-2 text-sm",
                                            )}
                                        >
                                            View Profile
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={handleLogout}
                                            className={classNames(
                                                active
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-700",
                                                "block w-full px-4 py-2 text-left text-sm",
                                            )}
                                        >
                                            Sign out
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            ) : (
                <Link href="/Login" passHref legacyBehavior>
                    <a className="px-4 py-2 bg-red text-white font-bold rounded-full ml-4">
                        Login
                    </a>
                </Link>
            )}
        </div>
        <div className="md:hidden">
                    {/* Mobile Menu Button */}
                    <button
                        className="text-white focus:outline-none"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

             {/* Mobile Menu */}
             {mobileMenuOpen && (
                <div className="md:hidden absolute top-0 left-0 w-full bg-gray-800 text-white">
                    {/* Example of mobile menu items */}
                    <div className="p-4 border-white border">
                        <div id="brand" className="flex items-center flex-shrink-0 text-white mr-6">
                            <a href="/" className="text-red text-3xl font-black font-Title">Dondar</a>
                        </div>
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
                            href="/tentang"
                            className="px-4 py-2 hover:border-b-2 border-red hover:text-red"
                        >
                            Tentang
                        </a>
                         {/* Close button */}
                         <button
                            className="text-white px-4 py-2 mt-4 mr-3 bg-red hover:bg-opacity-75 rounded-full"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Close
                        </button>
                        {userId ? (
                <Menu
                    as="div"
                    className="relative inline-block text-left"
                >
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-red px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red">
                            {user ? `Hello, ${user.nama}` : "Hello"}
                            <ChevronDownIcon
                                className="-mr-1 h-5 w-5 text-white"
                                aria-hidden="true"
                            />
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="/profile"
                                            className={classNames(
                                                active
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-700",
                                                "block px-4 py-2 text-xs",
                                            )}
                                        >
                                            View Profile
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={handleLogout}
                                            className={classNames(
                                                active
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-700",
                                                "block w-full px-4 py-2 text-left text-xs",
                                            )}
                                        >
                                            Sign out
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            ) : (
                <Link href="/Login" passHref legacyBehavior>
                    <a className="px-4 py-2 bg-red text-white font-bold rounded-full ml-4">
                        Login
                    </a>
                </Link>
            )}
                       
                    </div>
                </div>
            )}
        </nav>
  );
}
