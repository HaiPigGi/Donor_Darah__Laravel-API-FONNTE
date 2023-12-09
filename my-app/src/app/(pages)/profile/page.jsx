"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from "@/_components/Loading/Loading";
import Navbar from "@/_components/navbar";
import "@/_styles/css/login.css";
import "@/_styles/css/regis.css";
const Profile = () => {
    
  const [user, setUser] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_APP_URL_API;
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
      // Simulate a delay (e.g., API request)
      const delay = setTimeout(() => {
          setLoading(false);
      }, 3500);

      // Update progress every 50ms until it reaches 100%
      const progressInterval = setInterval(() => {
          setProgress((prevProgress) =>
              prevProgress < 100 ? prevProgress + 1 : prevProgress
          );
      }, 50);

      // Cleanup the timeout and interval to avoid memory leaks
      return () => {
          clearTimeout(delay);
          clearInterval(progressInterval);
      };
  }, []);

  useEffect(() => {
    // Check if userId exists in sessionStorage
    const storedUserId = sessionStorage.getItem('userId');

    if (storedUserId) {
      // userId exists, update your state
      setUser(storedUserId);
      getUserByID(storedUserId);
    }
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  const handleEdit = () => {
    // Handle edit logic here
    console.log("Edit button clicked");
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
  return (
    <div className="my-bg">


         <div>
            {loading ? (
                <Loading progress={progress} />
                ) : (
                    <div>
                     <Navbar itemsColor="text-white" />
                     <div className="row">
      {user && (
          <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-4">Welcome, {user.nama}!</h1>
          {/* Render other user details as a form */}
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Telepon:</label>
              <input
                type="text"
                value={user.telepon}
                readOnly
                className="mt-1 p-2 w-full border rounded-md"
                />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">KTP:</label>
              <input
                type="text"
                value={user.ktp}
                readOnly
                className="mt-1 p-2 w-full border rounded-md"
                />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Golongan Darah:</label>
              <input
                type="text"
                value={user.golongan_darah}
                readOnly
                className="mt-1 p-2 w-full border rounded-md"
                />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Pekerjaan:</label>
              <input
                type="text"
                value={user.pekerjaan}
                readOnly
                className="mt-1 p-2 w-full border rounded-md"
                />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Kelurahan ID:</label>
              <input
                type="text"
                value={user.kelurahan_id}
                readOnly
                className="mt-1 p-2 w-full border rounded-md"
                />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Tagar ID:</label>
              <input
                type="text"
                value={user.tagar_id}
                readOnly
                className="mt-1 p-2 w-full border rounded-md"
                />
            </div>
            <div className="mb-4">
              <button
                type="button"
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                Edit
              </button>
              </div>
          </form>
        </div>
      )}
      </div>
                </div>
                    )}
                 </div>
    </div>
                
  );
};

export default Profile;
