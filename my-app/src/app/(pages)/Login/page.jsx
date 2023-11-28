"use client";
import { useState } from "react";
import axios from 'axios';
import "@/_styles/css/login.css";
import Navbar from "@/_components/navbar";

export default function Login() {
  const [session, setSession] = useState({});
  const [modalContent, setModalContent] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendCodeLogin = async () => {
    try {
      const telepon = document.getElementsByName("noTelp")[0].value;
      console.log("Nomer telpon : ", telepon);

      const response = await axios.post("http://localhost:8000/api/verify/login", {
        telepon: telepon,  // Corrected variable name
      }, {
        headers: {
          csrf_token: session.csrf_token,
        },
      });

      if (response.status === 200) {
        // Verification successful
        setModalContent("Code Verified Successfully");
        setModalIsOpen(true);
      } else {
        // Verification failed, show an error message
        setErrorMessage("Code Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error sending code:", error);
    }
  };

  const getcsrf = async () => {
    try {
      const cookie = await axios.get("http://localhost:8000/api/get-session-data");
      setSession(cookie);
    } catch (error) {
      console.error("Error getting CSRF token:", error);
    }
  };

  return (
    <main>
      <div className="my-bg">
        <Navbar itemsColor="text-white" />
        <div className="row">
          <div className="rectangle-36">
            <div className="wraper text-center">
              <form className="w-full h-full p-5 relative">
                <h1 className="text-black font-Title text-[40px] w-full block left-0 absolute">LOGIN</h1>
                <div className="flex justify-center items-center h-full my-auto">
                  <div>
                    <div className="input-container">
                      <div className="absolute bg-black h-14 w-14 z-0 rounded-e-3xl rounded-s-md flex justify-center items-center">
                        <img
                          className=""
                          src="/img/phone.svg"
                          alt="Icon"
                          height={30}
                          width={30}
                        />
                      </div>
                      <input
                        className="border-2 border-black rounded w-[23rem] h-14 ps-[4rem] text-[25px]"
                        type="text"
                        placeholder="Masukkan No Anda"
                        name="noTelp"
                      />
                    </div>
                    <p className="text-l text-left mt-2 col-start-1 col-span-3 my-auto mx-auto w-full">Kode OTP dikirim via Whatsapp</p>
                    <div className="absolute right-0 bottom-0 flex items-center justify-end space-x-5 p-5">
                      <a href="/register" className="text-l font-bold text-red border-b border-red">Daftar Akun</a>
                      <button onClick={sendCodeLogin} className="font-bold text-l text-white rounded-lg px-3 py-2 h-12 w-40 bg-red">
                        <a href="/OTP">Kirim Kode OTP</a>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
