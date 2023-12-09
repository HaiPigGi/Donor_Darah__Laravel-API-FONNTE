"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "@/_components/navbar";
import "@/_styles/css/login.css";
import Loading from "@/_components/Loading/Loading";

export default function Otp() {
  const [session, setSession] = useState({});
  const [data, setData] = useState();
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const apiUrl = process.env.NEXT_PUBLIC_APP_URL_API;

  useEffect(() => {
    // Simulate a delay (e.g., API request)
    const delay = setTimeout(() => {
      setLoading(false);
    }, 3500);

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

  const getcsrf = async () => {
    try {
      let csrf = await axios.get(`${apiUrl}/api/get-session-data`);
      console.log(csrf.data);
      setSession(csrf.data);
    } catch (e) {
      alert(e.message);
    }
  };

  const checkVerification = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/verify/otp/login`,
        {
          code: code,
        },
        {
          headers: {
            csrf_token: session.csrf_token,
          },
        }
      );

      console.log("Response from server:", response);

      if (response.status === 200) {
        console.log("Verification is successful");
        const jwtToken = response.data.token;
        const userRoleFromResponse = response.data.role; // Get the user role
        console.log("User ID from response:", jwtToken);
         // Store the JWT token in session storage
          sessionStorage.setItem('jwtToken', jwtToken);
          sessionStorage.setItem('userRole', userRoleFromResponse);
         // Redirect based on user role
      if (userRoleFromResponse === "admin") {
        setUserId(jwtToken);
        redirectToOtherPageAdmin();
      } else {
        setUserId(jwtToken);
        redirectToOtherPage();
      }
      } else {
        console.log("Verification failed");
      }
    } catch (error) {
      console.error("AxiosError:", error);
    }
  };

  const redirectToOtherPage = () => {
    window.location.href = "/";
  };
  const redirectToOtherPageAdmin = () => {
    window.location.href = "/admin";
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
                    <form>
                      <h1 className="text-black font-Title text-[40px]">OTP</h1>
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
                        className="border-2 border-black rounded w-[20rem] h-14 ps-[4rem] text-[25px]"
                        type="text"
                        placeholder="Masukkan Kode OTP"
                        name="otp"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                      />
                      <p className="tulisan text-xs"></p>
                      <button
                        type="button"
                        className=" border-2 bg-red text-xs text-white rounded-lg py-2 px-3 mt-5"
                        onClick={checkVerification}
                      >
                        Kirim OTP
                      </button>
                      <br />
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
