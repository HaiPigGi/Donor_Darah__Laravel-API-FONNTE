"use client";
import React, { useState, useEffect } from "react";
import Loading from "@/_components/Loading/Loading";
import axios from "axios";
import withAuth from "@/_components/Auth/WithAuth";
import UserDetailsModal from "./UserDetailsModal";
import AddPostModal from "./AddPostModal";
import EditPostModal from "./EditPostModal";
import FileSaver from 'file-saver';
const Dashboard = (props) => {
    const [activeMenu, setActiveMenu] = useState("");
    const [users, setUsers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [dataAkseptor, setDataAkseptor] = useState([]);

    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [userId, setUserId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAkseptor, setSelectedAkseptor] = useState(null);
    const apiUrl = process.env.NEXT_PUBLIC_APP_URL_API;
    const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [token,setToken] = useState(null);


    useEffect(() => {
        const storedUserId = sessionStorage.getItem('jwtToken');
      
        if (storedUserId) {
          // userId exists, update your state
          setUserId(storedUserId);
          setToken(storedUserId);
          getDataAkseptor(storedUserId);
          getAllDataPost(storedUserId);
          getAllUser(storedUserId);
        //   getLaporanPDF(storedUserId);
      
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
        window.location.href = "/Login";
    };

    const getAllUser = async (jwtToken) => {
        try {
            const response = await axios.get(`${apiUrl}/api/admin/getUser`, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            setUsers(response.data); // Set the retrieved user data
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const getDataAkseptor = async (jwtToken) => {
        try {
            const response = await axios.get(
                `${apiUrl}/api/admin/verify_akseptor`, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                });
            setDataAkseptor(response.data); // Set the retrieved dataAkseptor
        } catch (error) {
            console.error("Error fetching dataAkseptor:", error);
        }
    };

    useEffect(() => {
        // Simulate a delay (e.g., API request)
        const delay = setTimeout(() => {
            setLoading(false);
        }, 4500);

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

    const getUserDetails = async (akseptorId) => {
        try {
            const response = await axios.get(
                `${apiUrl}/api/admin/getAkseptor/${akseptorId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            const userDetails = response.data;

            setSelectedAkseptor(userDetails);
            setIsModalOpen(true);
        } catch (error) {
            // Handle errors if the request fails
            console.error("Error fetching user details:", error);
        }
    };

    const handleAddPost = () => {
        setIsAddPostModalOpen(true);
    };

    const getAllDataPost = async (jwtToken) => {
        try {
            const response = await axios.get(
                `${apiUrl}/api/admin/posts/all-data`, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                });
            setPosts(response.data.posts);
            console.log("cek data : ",response.data.post);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const handleOpenEditModal = (post) => {
        console.log("Editing post:", post);
        setEditingPost(post);
        console.log("isEditModalOpen before update:", isEditModalOpen);
        setIsEditModalOpen(true);
        console.log("isEditModalOpen after update:", isEditModalOpen);
    };

    // Function to close the EditPostModal
    const handleCloseEditModal = () => {
        setEditingPost(null);
        setIsEditModalOpen(false);
    };

    const handleDeletePost = async (postId) => {
        try {
            const response = await axios.delete(
                `${apiUrl}/api/admin/posts/${postId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            console.log("cek response : ", response.data);

            // Jika status response tidak ok, lemparkan error
            if (response.status !== 200) {
                throw new Error(
                    `Failed to delete post (HTTP ${response.status})`,
                );
            }
            // Lakukan operasi atau pembaruan UI lainnya setelah penghapusan berhasil
        } catch (error) {
            console.error("Error deleting post:", error.message);
            // Tampilkan pesan kesalahan atau lakukan tindakan lain jika terjadi kesalahan saat menghapus
        }
    };

    const getLaporanPDF = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/admin/generate-pdf-all-akseptor`, {
                responseType: 'blob',  // Set responseType to 'blob' to handle binary data
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            // Handle the response
            const contentDispositionHeader = response.headers['content-disposition'];
            const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = fileNameRegex.exec(contentDispositionHeader);
    
            const fileName = matches && matches[1] ? matches[1] : 'all_akseptors.pdf';
    
            // Use FileSaver to save the file
            FileSaver.saveAs(new Blob([response.data]), fileName);
    
            // Optionally, you can show a success message or perform other actions
            console.log('PDF downloaded successfully');
        } catch (error) {
            // Handle errors, e.g., show an error message
            console.error('Error fetching PDF:', error);
        }
    };
    const getLaporanPDFVerifyUser = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/admin/generate-pdf-verified-akseptor`, {
                responseType: 'blob',  // Set responseType to 'blob' to handle binary data
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            // Handle the response
            const contentDispositionHeader = response.headers['content-disposition'];
            const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = fileNameRegex.exec(contentDispositionHeader);
    
            const fileName = matches && matches[1] ? matches[1] : 'verified_akseptors.pdf';
    
            // Use FileSaver to save the file
            FileSaver.saveAs(new Blob([response.data]), fileName);
    
            // Optionally, you can show a success message or perform other actions
            console.log('PDF downloaded successfully');
        } catch (error) {
            // Handle errors, e.g., show an error message
            console.error('Error fetching PDF:', error);
        }
    };
    

    return (
        <div>
            {loading ? (
                <Loading progress={progress} />
            ) : (
                <div>
                    <div className="flex h-screen bg-gray-200">
                        <div className="p-6 w-64 bg-white border-r">
                            <h2 className="text-lg font-semibold text-gray-600 mb-4">
                                Admin Dashboard
                            </h2>
                            <nav>
                                <a
                                    href="#"
                                    onClick={() => setActiveMenu("users")}
                                    className="text-gray-700 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
                                >
                                    Lihat User
                                </a>
                                <a
                                    href="#"
                                    onClick={() =>
                                        setActiveMenu("dataAkseptor")
                                    }
                                    className="text-gray-700 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
                                >
                                    Data Akseptor
                                </a>
                                <a
                                    href="#"
                                    onClick={() => setActiveMenu("posts")}
                                    className="text-gray-700 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
                                >
                                    Lihat Posts
                                </a>
                                <button
                                    className="text-gray-700 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
                                    onClick={handleAddPost}
                                >
                                    Tambah Post
                                </button>
                                <a
                                    href="#"
                                    onClick={() =>
                                        setActiveMenu("Laporan")
                                    }
                                    className="text-gray-700 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
                                >
                                    Laporan
                                </a>
                                <button
                                    className="text-gray-700 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-600 hover:text-white"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </nav>
                        </div>
                        <div className="flex-grow p-6">
                            <h2 className="text-lg font-semibold text-gray-600 mb-2">
                                Selamat datang di Dashboard Admin
                            </h2>
                            <div className="border rounded-lg p-4 bg-white">
                                {activeMenu === "users" && (
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-600 mb-2">
                                            Daftar User
                                        </h2>
                                        {users.length > 0 ? (
                                            <ul>
                                                {users.map((user, index) => (
                                                    <li
                                                        key={index}
                                                        className="border-b py-2"
                                                    >
                                                        <h3 className="font-semibold text-gray-800">
                                                            Nama: {user.nama}
                                                        </h3>
                                                        <p className="text-sm text-gray-600">
                                                            Telepon:{" "}
                                                            {user.telepon}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            KTP: {user.ktp}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            Pekerjaan:{" "}
                                                            {user.pekerjaan}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            Golongan Darah:{" "}
                                                            {
                                                                user.golongan_darah
                                                            }
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            Kelurahan ID:{" "}
                                                            {user.kelurahan_id}
                                                        </p>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>
                                                Tidak ada user yang terdaftar.
                                            </p>
                                        )}
                                    </div>
                                )}
                                {activeMenu === "dataAkseptor" && (
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-600 mb-2">
                                            Data Akseptor
                                        </h2>
                                        {dataAkseptor.length > 0 ? (
                                            <ul>
                                                {dataAkseptor.map(
                                                    (akseptor, index) => (
                                                        <li
                                                            key={index}
                                                            className="border-b py-4"
                                                        >
                                                            {/* Display complete information for each akseptor */}
                                                            <h3 className="font-semibold text-gray-800">
                                                                Nama:{" "}
                                                                {akseptor.nama}
                                                            </h3>
                                                            <p className="text-sm text-gray-600">
                                                                Telepon:{" "}
                                                                {
                                                                    akseptor.telepon
                                                                }
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                KTP:{" "}
                                                                {akseptor.ktp}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                Golongan Darah:{" "}
                                                                {
                                                                    akseptor.golongan_darah
                                                                }
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                Jumlah Kantong:{" "}
                                                                {
                                                                    akseptor.jumlah_kantong
                                                                }
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                Kelurahan ID:{" "}
                                                                {
                                                                    akseptor.kelurahan_id
                                                                }
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                Alamat:{" "}
                                                                {
                                                                    akseptor.alamat
                                                                }
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                Tujuan
                                                                Pengajuan:{" "}
                                                                {
                                                                    akseptor.tujuan_Pengajuan
                                                                }
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                Status:{" "}
                                                                {
                                                                    akseptor.status
                                                                }
                                                            </p>

                                                            {/* Button to open the modal */}
                                                            <button
                                                                className="text-sm text-blue-500 hover:underline"
                                                                onClick={() =>
                                                                    getUserDetails(
                                                                        akseptor.id,
                                                                    )
                                                                }
                                                            >
                                                                Get Details
                                                            </button>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        ) : (
                                            <p>
                                                Tidak ada data akseptor yang
                                                tersedia.
                                            </p>
                                        )}
                                    </div>
                                )}
                                {activeMenu === "posts" && (
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-600 mb-2">
                                            Daftar Posts
                                        </h2>
                                        {posts.length > 0 ? (
                                            <ul>
                                                {posts.map((post, index) => (
                                                    <li
                                                        key={index}
                                                        className="border-b py-4"
                                                    >
                                                        {/* Display post information */}
                                                        <h3 className="font-semibold text-gray-800">
                                                            Title: {post.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-600">
                                                            Content:{" "}
                                                            {post.content}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            Event: {post.event}
                                                        </p>

                                                        {/* Display the image if the post has an 'image' property */}
                                                        {post.image && (
                                                            <div>
                                                                <img
                                                                    src={
                                                                        post
                                                                            .image
                                                                            .url
                                                                    }
                                                                    alt={`Image for ${post.title}`}
                                                                    className="max-w-full mt-2"
                                                                    style={{
                                                                        width: "150px",
                                                                    }} // Set your desired width here
                                                                />
                                                            </div>
                                                        )}

                                                        {/* Add additional details if needed */}
                                                        <div className="mt-4">
                                                            {/* Edit button */}
                                                            <button
                                                                className="mr-2 px-4 py-2 bg-green-500 text-white rounded"
                                                                onClick={() =>
                                                                    handleOpenEditModal(
                                                                        post,
                                                                    )
                                                                } // Pass the post object to the function
                                                            >
                                                                Edit
                                                            </button>

                                                            {/* Delete button */}
                                                            <button
                                                                className="px-4 py-2 bg-blue-500 text-white rounded"
                                                                onClick={() =>
                                                                    handleDeletePost(
                                                                        post.id,
                                                                    )
                                                                } // Replace handleDeletePost with your actual delete function
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>Tidak ada post yang tersedia.</p>
                                        )}
                                    </div>
                                )}
                                 {activeMenu === "Laporan" && (
                                   <div>
                                   <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                       Laporan
                                   </h2>
                                   <button
                                       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                       onClick={getLaporanPDF}
                                   >
                                       Generate All Akseptor PDF
                                   </button>
                               
                                   <button
                                       className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                       onClick={getLaporanPDFVerifyUser}
                                   >
                                       Generate Verified Akseptor PDF
                                   </button>
                               </div>
                               
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Render the modal */}
            {isModalOpen && (
                <UserDetailsModal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    akseptorDetails={selectedAkseptor}
                />
            )}
            {isAddPostModalOpen && (
                <AddPostModal
                    isOpen={isAddPostModalOpen}
                    onRequestClose={() => setIsAddPostModalOpen(false)}
                />
            )}
            {isEditModalOpen && (
                <EditPostModal
                    isOpen={isEditModalOpen}
                    onRequestClose={handleCloseEditModal}
                    editingPost={editingPost}
                />
            )}
            {/* ... (existing code) */}
        </div>
    );
};

export default withAuth(Dashboard, ['admin']);
