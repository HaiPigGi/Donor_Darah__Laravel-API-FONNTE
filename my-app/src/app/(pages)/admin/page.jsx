"use client"
import React, { useState, useEffect } from 'react';
import Loading from '@/_components/Loading/Loading';
import axios from 'axios';
import withAuth from '@/_components/Auth/WithAuth';

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState('');
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [userId, setUserId] = useState(null);

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
      const response = await axios.delete(`http://localhost:8000/api/logout/${userId}`);
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
      const response = await axios.get("http://localhost:8000/api/admin/getUser");
      setUsers(response.data); // Set the retrieved user data
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getAllUser();
    // ... other code
  }, []);

  useEffect(() => {
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
                {activeMenu === 'requests' && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-600 mb-2">Daftar Permintaan</h2>
                    {/* ... rendering code for requests */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(Dashboard);