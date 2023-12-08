"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "@/_components/navbar";
import "@/_styles/css/login.css";
import Loading from "@/_components/Loading/Loading";

export default function Login() {
  const [session, setSession] = useState({});
  const [telepon, setTelepon] = useState("");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const apiUrl = process.env.NEXT_PUBLIC_APP_URL_API;

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

  const sendCodeLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior  

    try {
      const response = await axios.post(
        `${apiUrl}/api/verify/login`,
        {
          telepon: telepon,
        },
        {
          headers: {
            csrf_token: session.csrf_token,
          },
        }
      );

      if (response.status === 200) {
        console.log('berhasil Kirim');
        // Redirect to the   OTP page
        redirectToOtherPage();
      } else {
        console.log("Code Send failed. Please try again.");
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      // Set loading to false when the process is complete (either success or failure)
      setLoading(false);
    }
  };

  const handleApiError = (error) => {
    if (error.response) {
      console.error("Server responded with error status:", error.response.status);
    } else if (error.request) {
      console.error("No response received from the server");
    } else {
      console.error("Error setting up the request:", error.message);
    }
  };

  const getcsrf = async () => {
    try {
      const cookie = await axios.get(`${apiUrl}/api/get-session-data`);
      setSession(cookie);
    } catch (error) {
      console.error("Error getting CSRF token:", error);
    }
  };

  const redirectToOtherPage = () => {
    window.location.href = '/Login/OTP'; 
  };

  return (
    <main>
      <div className="my-bg">
        <div>
          {loading ? (
            <Loading progress={progress} />
          ) : (
            <div>
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
                              name="telepon"
                              value={telepon}
                              onChange={(e) => setTelepon(e.target.value)}
                            />
                          </div>
                          <p className="text-l text-left mt-2 col-start-1 col-span-3 my-auto mx-auto w-full">Kode OTP dikirim via Whatsapp</p>
                          <div className="absolute right-0 bottom-0 flex items-center justify-end space-x-5 p-5">
                            <a href="/register" className="text-l font-bold text-red border-b border-red">Register</a>
                            <button 
                              type="button"
                              className="font-bold text-l text-white rounded-lg px-3 py-2 h-12 w-40 bg-red" onClick={sendCodeLogin} > 
                              Send OTP
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
