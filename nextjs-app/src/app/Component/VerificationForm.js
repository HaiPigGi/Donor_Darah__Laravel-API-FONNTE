"use client";
// Import the useRouter function from next/navigation
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";

function VerificationForm() {
    const [formData, setFormData] = useState({
        nama: 'Kapi',
        telepon: '082253739918',
        golongan_darah: 'O',
        provinsi_id: 64,
        kabupaten_id: 6402,
        kecamatan_id: 6402060,
        kelurahan_id: 6402060004
      });

      const [verificationCode, setVerificationCode] = useState('');

      const handleRegister = async () => {
        try {
          const response = await axios.post('http://localhost:8000/api/register/auth', formData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Registration successful:', response.data);

          // Setelah mendaftar, kirim kode verifikasi
          const verificationResponse = await axios.post('http://localhost:8000/api/register/auth/verify', {
            code: verificationCode
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Verification successful:', verificationResponse.data);
        } catch (error) {
          console.error('Error during registration or verification:', error);
        }
      };

      return (
        <div>
          <h1>Register Page</h1>
          <div>
            <label>Nama:</label>
            <input
              type="text"
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            />
          </div>
          <div>
            <label>Telepon:</label>
            <input
              type="text"
              value={formData.telepon}
              onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
            />
          </div>
          <div>
            <label>Kode Verifikasi:</label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
          <button onClick={handleRegister}>Daftar</button>
        </div>
      );
    };
export default VerificationForm;
