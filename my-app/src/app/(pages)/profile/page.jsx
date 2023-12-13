"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from "@/_components/Loading/Loading";
import Navbar from "@/_components/navbar";
import "@/_styles/css/login.css";
import "@/_styles/css/regis.css";
import "@/_styles/css/profile.css";
import Modal from 'react-modal';
import Dropdown from "@/_components/Dropdown/dropdown";
import AutoLogout from '@/_components/Auth/AutoLogout';

const Profile = () => {
  const [user, setUser] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_APP_URL_API;
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({
    nama: '',
    telepon: '',
    ktp: '',
    pekerjaan: '',
    golongan_darah: '',
    kelurahan_id: '',
  });

  useEffect(() => {
    const autoLogout = new AutoLogout();
    // Initiate the automatic logout mechanism
    autoLogout.checkToken();

    // Simulate a delay (e.g., API request)
    const delay = setTimeout(() => {
      setLoading(false);
    }, 4500);

    // Update progress every 50ms until it reaches 100%
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 1 : prevProgress));
    }, 50);

    // Cleanup the timeout and interval to avoid memory leaks
    return () => {
      clearTimeout(delay);
      clearInterval(progressInterval);
      autoLogout.clearLogoutTimer(); // Clear the logout timer when the component unmounts
    };
  }, []);

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
    const storedUserId = sessionStorage.getItem('jwtToken');

    if (storedUserId) {
      // userId exists, update your state
      setUser(storedUserId);
      getUserByID(storedUserId);
    }
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  const getUserByID = async (jwtToken) => {
    try {
      // Check if Token is not null
      if (jwtToken) {
        const response = await axios.get(`${apiUrl}/api/users/getUser`, {
          headers: {
              'Authorization': `Bearer ${jwtToken}`
          }
      });
        setUser(response.data.user); // Assuming the user data is returned as an object
      } else {
        console.error("userId is null");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleEdit = () => {
    // Pre-fill the editedUser state with the current user details
    setEditedUser({
      nama: user.nama,
      telepon: user.telepon,
      ktp: user.ktp,
      pekerjaan: user.pekerjaan,
      golongan_darah: user.golongan_darah,
      kelurahan_id: user.kelurahan_id,
    });

    openModal();
  };
  const handleInputChange = (e) => {
    // Update the editedUser state based on user input
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to update user details
      const response = await axios.put(`${apiUrl}/api/users/getUser/${user.id}`, editedUser, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`,
        },
      });

      if (response.data.status === 'success') {
        // Update the user state with the new details
        setUser({
          ...user,
          ...editedUser,
        });

        closeModal();
      } else {
        console.error('Failed to update user:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  
  return (
    <section className="h-screen overflow-hidden relative">
             <div className="my-bg h-full bg-cover bg-center">
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
              <label className="block text-sm font-medium text-gray-600">Kelurahan</label>
              <input
                type="text"
                value={user.kelurahan_nama}
                readOnly
                className="mt-1 p-2 w-full border rounded-md"
                />
            </div>
            <div className="mb-4">
            <button
              type="button"
              onClick={openModal}
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

      {/* Modal */}
      <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Edit User"
>
  <h2>Edit User</h2>
  <form onSubmit={handleFormSubmit} className="w-full max-w-md">
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-600">Nama:</label>
      <input
        type="text"
        name="nama"
        value={editedUser.nama}
        onChange={handleInputChange}
        className="mt-1 p-2 w-full border rounded-md"
      />
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-600">Telepon:</label>
      <input
        type="text"
        name="telepon"
        value={editedUser.telepon}
        onChange={handleInputChange}
        className="mt-1 p-2 w-full border rounded-md"
      />
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-600">KTP:</label>
      <input
        type="text"
        name="ktp"
        value={editedUser.ktp}
        onChange={handleInputChange}
        className="mt-1 p-2 w-full border rounded-md"
      />
    </div>

    <div className="mb-4">
  <div className="input-container mb-1 font-Subtitle border-2">
    <div className="absolute bg-black h-14 w-14 z-0 rounded-e-[100px] rounded-s-2xl flex justify-center items-center">
      <img
        className=""
        src="/img/Vector.svg"
        alt="Icon"
        height={25}
        width={25}
      />
    </div>
    <Dropdown
      category="pekerjaan"
      value={editedUser.pekerjaan}
      sendToParent={(value) => {
        // Log the selected value
        // Update the state
        setEditedUser((prevUser) => ({
          ...prevUser,
          pekerjaan: value,
        }));
      }}
    />
  </div>
</div>

    <div className="mb-4">
    <div className="input-container mb-1 font-Subtitle border-2">
                        <div className="absolute bg-black h-14 w-14 z-0 rounded-e-[100px] rounded-s-2xl flex justify-center items-center">
                            <img
                                className="input-icon "
                                src="/img/darah.svg"
                                alt="Icon"
                                height={25}
                                width={25}
                            />
                        </div>
                            <Dropdown
                                category="golongan_darah"
                                value={editedUser.golongan_darah}
                                sendToParent={(value) => {
                                  // Log the selected value

                                  // Update the state
                                  setEditedUser((prevUser) => ({
                                    ...prevUser,
                                    golongan_darah: value,
                                  }));
                                }}
                            />
                    
                    </div>
            </div>
    <div className="mb-4">
    <div className=" inline-block font-Subtitle text-[20px] w-full">
                            <Dropdown category="provinsi" />
                            <Dropdown category="kabupaten" />
                            <div className="flex gap-6 justify-center w-full ">
                                <div className="w-1/2">
                                    <Dropdown category="kecamatan" />
                                </div>
                                <div className="w-1/2">
                                <Dropdown
                                      category="kelurahan"
                                      value={editedUser.kelurahan_id}
                                      sendToParent={(value) => {
                                        // Log the selected value

                                        // Update the state
                                        setEditedUser((prevUser) => ({
                                          ...prevUser,
                                          kelurahan_id: value,
                                        }));
                                      }}
                                    />

                                    </div>

                             </div>
                        </div>
    </div>

    {/* <div className="mb-4">
      <label className="block text-sm font-medium text-gray-600">Tagar ID:</label>
      <input
        type="text"
        name="tagar_id"
        value={editedUser.tagar_id}
        onChange={handleInputChange}
        className="mt-1 p-2 w-full border rounded-md"
      />
    </div> */}

    <div className="mb-4">
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Save Changes
      </button>
    </div>
  </form>
  <button onClick={closeModal}>Close Modal</button>
</Modal>

    </div>
    </section>
  );
};

export default Profile;
