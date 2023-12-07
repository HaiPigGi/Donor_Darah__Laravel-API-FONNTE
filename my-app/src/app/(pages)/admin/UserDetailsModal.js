"use client";
import React from 'react';
import axios from 'axios'; // Import axios
import Modal from 'react-modal';

const UserDetailsModal = ({ isOpen, onRequestClose, akseptorDetails }) => {
  const apiUrl = process.env.NEXT_PUBLIC_APP_URL_API;

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

      const verifyAkseptor = async (akseptorId) => {
        try {
          // Send a PUT request to update Akseptor data
          const response = await axios.put(`${apiUrl}/api/admin/verify_akseptor/${akseptorId}`);
      
          // Handle the response as needed
          console.log('Verification response:', response.data);
          // You can update your state or perform other actions based on the response
      
        } catch (error) {
          // Handle errors if the request fails
          console.error('Error during verification:', error);
          // You can also update state or perform other actions based on the error
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
          <h3>Nama: {akseptorDetails.nama}</h3>
          <p>Telepon: {akseptorDetails.telepon}</p>
          <p>KTP: {akseptorDetails.ktp}</p>
          <p>Golongan Darah: {akseptorDetails.golongan_darah}</p>
          <p>Jumlah Kantong: {akseptorDetails.jumlah_kantong}</p>
          <p>Kelurahan ID: {akseptorDetails.kelurahan_id}</p>
          <p>Alamat: {akseptorDetails.alamat}</p>
          <p>Tujuan Pengajuan: {akseptorDetails.tujuan_Pengajuan}</p>
          <p>Status: {akseptorDetails.status}</p>
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
