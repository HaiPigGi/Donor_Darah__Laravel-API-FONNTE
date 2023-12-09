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
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if userId exists in sessionStorage
        const storedUserId = sessionStorage.getItem("userId");

        if (storedUserId) {
            // userId exists, update your state
            setUserId(storedUserId);
            getUserByID(storedUserId); // Fetch user data when userId is available
        }
    }, []); // Empty dependency array ensures it runs only once when the component mounts

    const handleLogout = async () => {
        try {
            // Send a DELETE request to the server
            const response = await axios.delete(
                `${apiUrl}/api/logout/${userId}`,
            );
            // Clear userId from sessionStorage
            console.log("Logout Response:", response);
            sessionStorage.removeItem("userId");
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
        window.location.href = "/";
    };

    const getUserByID = async (id) => {
        try {
            // Check if userId is not null
            if (id) {
                const response = await axios.get(
                    `${apiUrl}/api/users/getUser/${id}`,
                );
                setUser(response.data.user); // Assuming the user data is returned as an object
                console.log("nama : ", response.data.user.nama); // Access the name directly from the response
            } else {
                console.error("userId is null");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    const handleDropdownToggle = () => {
        const dropDownBasic = document.getElementById("Menus");
        setIsOpen(!isOpen);

        if (isOpen) {
            dropDownBasic.classList.add("transition");
            dropDownBasic.classList.add("ease-out");
            dropDownBasic.classList.add("duration-100");

            dropDownBasic.classList.add("from:transform");
            dropDownBasic.classList.add("from:opacity-0");
            dropDownBasic.classList.add("from:scale-95");
            dropDownBasic.classList.add("to:transform");
            dropDownBasic.classList.add("to:opacity-100");
            dropDownBasic.classList.add("to:scale-100");
          }else{
            dropDownBasic.classList.remove("transition");
            dropDownBasic.classList.reomve("ease-out");
            dropDownBasic.classList.reomve("duration-100");

            dropDownBasic.classList.reomve("from:transform");
            dropDownBasic.classList.reomve("from:opacity-0");
            dropDownBasic.classList.reomve("from:scale-95");
            dropDownBasic.classList.reomve("to:transform");
            dropDownBasic.classList.reomve("to:opacity-100");
            dropDownBasic.classList.reomve("to:scale-100");

        }
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
                    <a
                        href="/"
                        className="text-red text-3xl font-black font-Title"
                    >
                        Dondar
                    </a>
                </div>
                <div
                    id="items"
                    className={[
                        "font-Subtitle font-regular md:visible collapse w-1/2 text-right",
                        props.itemsColor,
                    ].join(" ")}
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
                        // <Dropdown className="inline">
                        //     <Dropdown.Toggle
                        //         id="dropdown-basic"
                        //         className="px-4 py-2 bg-red text-white font-bold rounded-full ml-4"
                        //     >
                        //         {user ? `Hello, ${user.nama}` : "Hello"}{" "}
                        //         {/* Access the name directly from the user state */}
                        //     </Dropdown.Toggle>
                        //     <Dropdown.Menu>
                        //         <Dropdown.Item href={"/profile"}>
                        //             View Profile
                        //         </Dropdown.Item>
                        //         <br />
                        //         <Dropdown.Item onClick={handleLogout}>
                        //             Logout
                        //         </Dropdown.Item>
                        //     </Dropdown.Menu>
                        // </Dropdown>
                        <div class="relative inline-block text-left">
                            <div>
                                <button
                                    type="button"
                                    class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    id="menu-button"
                                    aria-expanded="true"
                                    aria-haspopup="true"
                                    onClick={handleDropdownToggle}
                                >
                                    Options
                                    <svg
                                        class="-mr-1 h-5 w-5 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div
                                class="absolute right-0 z-10 mt-2 w-56 origin-top-right  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="menu-button"
                                tabindex="-1"
                                id="Menus"
                            >
                                <div class="py-1" role="none">
                                    <a
                                        href="#"
                                        class="text-gray-700 block px-4 py-2 text-sm"
                                        role="menuitem"
                                        tabindex="-1"
                                        id="menu-item-0"
                                    >
                                        Account settings
                                    </a>
                                    <a
                                        href="#"
                                        class="text-gray-700 block px-4 py-2 text-sm"
                                        role="menuitem"
                                        tabindex="-1"
                                        id="menu-item-1"
                                    >
                                        Support
                                    </a>
                                    <a
                                        href="#"
                                        class="text-gray-700 block px-4 py-2 text-sm"
                                        role="menuitem"
                                        tabindex="-1"
                                        id="menu-item-2"
                                    >
                                        License
                                    </a>
                                    <form method="POST" action="#" role="none">
                                        <button
                                            type="submit"
                                            class="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                                            role="menuitem"
                                            tabindex="-1"
                                            id="menu-item-3"
                                        >
                                            Sign out
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
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
