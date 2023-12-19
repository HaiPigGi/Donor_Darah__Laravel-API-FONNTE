"use client";
import axios from 'axios';
import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';

const UserDetailsModal = ({ isOpen, onRequestClose, akseptorDetails }) => {
  const apiUrl = process.env.NEXT_PUBLIC_APP_URL_API;
  const [token, setToken] = useState(null);

  const customStyles = {
    content: {
      width: '60%',
      margin: 'auto',
      maxHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Center content horizontally
      justifyContent: 'center', // Center content vertically
    },
  };

  useEffect(() => {
    // Check if userId exists in sessionStorage
    const storedUserId = sessionStorage.getItem("jwtToken");
    if (storedUserId) {
      setToken(storedUserId);
    }
  }, [akseptorDetails]); // Include akseptorDetails as a dependency

  const verifyAkseptor = async (akseptorId) => {
    try {
      // Send a PUT request to update Akseptor data
      const response = await axios.put(`${apiUrl}/api/admin/verify_akseptor/${akseptorId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Handle the response as needed
      window.alert('Data Berhasil Di kirim');
      // You can update your state or perform other actions based on the response
    } catch (error) {
      if (error.response.status === 404) {
        // Display an alert if no data is found for broadcasting
        window.alert('Mohon maaf, tidak ada data yang sesuai untuk di broadcast.');
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="User Details Modal"
    >
      <h1>User Details</h1>
      {akseptorDetails && (
        <div>
          {/* Render user details here */}
        </div>
      )}
      <button
        onClick={() => verifyAkseptor(akseptorDetails.id)}
        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
      >
        Verifikasi
      </button>
      <button
        onClick={onRequestClose}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Close
      </button>
    </Modal>
  );
};

export default UserDetailsModal;
