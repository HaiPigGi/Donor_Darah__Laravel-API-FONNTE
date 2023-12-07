 "use client"
import React, { useState, useEffect } from 'react';
import Loading from '@/_components/Loading/Loading';
import axios from 'axios';
import withAuth from '@/_components/Auth/WithAuth';
import UserDetailsModal from './UserDetailsModal';
import AddPostModal from './AddPostModal';
import EditPostModal from './EditPostModal'; 

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState('');
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

  const getAllUser = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/admin/getUser`);
      setUsers(response.data); // Set the retrieved user data
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getDataAkseptor = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/admin/verify_akseptor`);
      setDataAkseptor(response.data); // Set the retrieved dataAkseptor
    } catch (error) {
      console.error("Error fetching dataAkseptor:", error);
    }
  };

  useEffect(() => {
    getAllUser();
    getDataAkseptor();
    getAllDataPost();

     // Simulate a delay (e.g., API request)
     const delay = setTimeout(() => {
      setLoading(false);
    }, 4500);

    // Update progress every 50ms until it reaches 100%
    const progressInterval = setInterval(() => {
      setProgress(prevProgress => (prevProgress < 100 ? prevProgress + 1 : prevProgress));
    }, 50);

    // Cleanup the timeout and interval to avoid memory leaks
    return () => {
      clearTimeout(delay);
      clearInterval(progressInterval);
    };
  
  }, []);


  const getUserDetails = async (akseptorId) => {
    try {
      const response = await axios.get(`${apiUrl}/api/admin/getAkseptor/${akseptorId}`);
      const userDetails = response.data;

      // Handle the userDetails data (e.g., update state or perform any other actions)
      console.log('User Details:', userDetails);
      setSelectedAkseptor(userDetails);
      setIsModalOpen(true);
    } catch (error) {
      // Handle errors if the request fails
      console.error('Error fetching user details:', error);
    }
  };

  const handleAddPost = () => {
    setIsAddPostModalOpen(true);
  };

  const getAllDataPost = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/admin/posts/all-data`);
      setPosts(response.data.posts);
      console.log("posts:", response.data.posts); // Log the response data instead of the state variable
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleOpenEditModal = (post) => {
    console.log('Editing post:', post);
    setEditingPost(post);
    console.log('isEditModalOpen before update:', isEditModalOpen);
    setIsEditModalOpen(true);
    console.log('isEditModalOpen after update:', isEditModalOpen);
  };
  
  
  // Function to close the EditPostModal
  const handleCloseEditModal = () => {
    setEditingPost(null);
    setIsEditModalOpen(false);
  };
  
  const handleDeletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/admin/posts/${postId}`);
      console.log("cek response : ",response.data)
      
      // Jika status response tidak ok, lemparkan error
      if (response.status !== 200) {
        throw new Error(`Failed to delete post (HTTP ${response.status})`);
      }
  
      console.log(response.data.message); // Log pesan sukses dari server jika diperlukan
  
      // Lakukan operasi atau pembaruan UI lainnya setelah penghapusan berhasil
    } catch (error) {
      console.error('Error deleting post:', error.message);
      // Tampilkan pesan kesalahan atau lakukan tindakan lain jika terjadi kesalahan saat menghapus
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
              <h2 className="text-lg font-semibold text-gray-600 mb-4">Admin Dashboard</h2>
              <nav>
                <a href="#" onClick={() => setActiveMenu('users')} className="text-gray-700 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">Lihat User</a>
                <a href="#" onClick={() => setActiveMenu('requests')} className="text-gray-700 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">Mengaply Permintaan</a>
                <a href="#" onClick={() => setActiveMenu('dataAkseptor')} className="text-gray-700 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">Data Akseptor</a>
                <a href="#" onClick={() => setActiveMenu('posts')} className="text-gray-700 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">Lihat Posts</a>
                <button
          className="text-gray-700 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
          onClick={handleAddPost}
        >
          Tambah Post
        </button>
                <button
                  className="text-gray-700 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-600 hover:text-white"
                  onClick={handleLogout}>
                  Logout
                </button>
              </nav>
            </div>
            <div className="flex-grow p-6">
              <h2 className="text-lg font-semibold text-gray-600 mb-2">Selamat datang di Dashboard Admin</h2>
              <div className="border rounded-lg p-4 bg-white">
                {activeMenu === 'users' && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-600 mb-2">Daftar User</h2>
                    {users.length > 0 ? (
                      <ul>
                        {users.map((user, index) => (
                          <li key={index} className="border-b py-2">
                            <h3 className="font-semibold text-gray-800">Nama: {user.nama}</h3>
                            <p className="text-sm text-gray-600">Telepon: {user.telepon}</p>
                            <p className="text-sm text-gray-600">KTP: {user.ktp}</p>
                            <p className="text-sm text-gray-600">Pekerjaan: {user.pekerjaan}</p>
                            <p className="text-sm text-gray-600">Golongan Darah: {user.golongan_darah}</p>
                            <p className="text-sm text-gray-600">Kelurahan ID: {user.kelurahan_id}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Tidak ada user yang terdaftar.</p>
                    )}
                  </div>
                )}
                {activeMenu === 'dataAkseptor' && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-600 mb-2">Data Akseptor</h2>
                    {dataAkseptor.length > 0 ? (
                      <ul>
                        {dataAkseptor.map((akseptor, index) => (
                          <li key={index} className="border-b py-4">
                            {/* Display complete information for each akseptor */}
                            <h3 className="font-semibold text-gray-800">Nama: {akseptor.nama}</h3>
                            <p className="text-sm text-gray-600">Telepon: {akseptor.telepon}</p>
                            <p className="text-sm text-gray-600">KTP: {akseptor.ktp}</p>
                            <p className="text-sm text-gray-600">Golongan Darah: {akseptor.golongan_darah}</p>
                            <p className="text-sm text-gray-600">Jumlah Kantong: {akseptor.jumlah_kantong}</p>
                            <p className="text-sm text-gray-600">Kelurahan ID: {akseptor.kelurahan_id}</p>
                            <p className="text-sm text-gray-600">Alamat: {akseptor.alamat}</p>
                            <p className="text-sm text-gray-600">Tujuan Pengajuan: {akseptor.tujuan_Pengajuan}</p>
                            <p className="text-sm text-gray-600">Status: {akseptor.status}</p>

                            {/* Button to open the modal */}
                            <button
                              className="text-sm text-blue-500 hover:underline"
                              onClick={() => getUserDetails(akseptor.id)}
                            >
                              Get Details
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Tidak ada data akseptor yang tersedia.</p>
                    )}
                  </div>
                )}
                {activeMenu === 'requests' && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-600 mb-2">Daftar Permintaan</h2>
                    {/* Rendering code for requests can be added here */}
                  </div>
                )}
                {activeMenu === 'posts' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-600 mb-2">Daftar Posts</h2>
                {posts.length > 0 ? (
                  <ul>
                    {posts.map((post, index) => (
                      <li key={index} className="border-b py-4">
                        {/* Display post information */}
                        <h3 className="font-semibold text-gray-800">Title: {post.title}</h3>
                        <p className="text-sm text-gray-600">Content: {post.content}</p>
                        <p className="text-sm text-gray-600">Event: {post.event}</p>

                        {/* Display the image if the post has an 'image' property */}
                        {post.image && (
                          <div>
                            <img
                              src={post.image.url}
                              alt={`Image for ${post.title}`}
                              className="max-w-full mt-2"
                              style={{ width: '150px' }} // Set your desired width here
                            />
                          </div>
                        )}

                        {/* Add additional details if needed */}
                        <div className="mt-4">
                          {/* Edit button */}
                          <button
                          className="mr-2 px-4 py-2 bg-green-500 text-white rounded"
                          onClick={() => handleOpenEditModal(post)} // Pass the post object to the function
                        >
                          Edit
                        </button>

                          {/* Delete button */}
                          <button
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={() => handleDeletePost(post.id)}  // Replace handleDeletePost with your actual delete function
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

export default Dashboard;
