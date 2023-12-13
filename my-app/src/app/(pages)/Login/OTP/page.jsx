"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "@/_components/navbar";
import "@/_styles/css/login.css";
import Loading from "@/_components/Loading/Loading";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import {
    ExclamationTriangleIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import ErrorMessage from '@/_components/errorMessage';

export default function Otp() {
  const [session, setSession] = useState({});
  const [data, setData] = useState();
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const cancelButtonRef = useRef();

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const apiUrl = process.env.NEXT_PUBLIC_APP_URL_API;
  const router = useRouter();

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
        const getUserId = response.data.id;
        console.log("User ID from response:", jwtToken);
         // Store the JWT token in session storage
          sessionStorage.setItem('jwtToken', jwtToken);
          sessionStorage.setItem('userRole', userRoleFromResponse);
          sessionStorage.setItem('userId', getUserId);
          
         // Redirect based on user role
      if (userRoleFromResponse === "admin") {
        setUserId(jwtToken);
        redirectToOtherPageAdmin();
      } else {
        setUserId(jwtToken);
        redirectToOtherPage();
      }
      } else {
        setErrorMessage("Verification failed");
        setModalIsOpen(true);
      }
    } catch (error) {
      setErrorMessage("");
      if(error.response.status === 500){
        const isString = code.match("/\d+/g")
        if(code == ""){
          setErrorMessage("Belum ada kode yang dimasukkan")
          setModalIsOpen(true);
        }else{
          console.log(isString)
          setErrorMessage("Kode tidak sesuai");
          setModalIsOpen(true);
        }
      }
    }
  };

  const redirectToOtherPage = () => {
    window.location.href="/"
  };
  const redirectToOtherPageAdmin = () => {
    router.push("/admin", {scroll:false});
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
                <div className="bg-white h-1/2 rounded-2xl  md:w-1/2">
                  <div className="wraper text-center text-Subtitle">
                    <form>
                      {/* Judul */}
                      <h1 className="text-black font-Title text-[40px]">OTP</h1>
                      {/* Input OTP */}
                      <div>
                        <input
                          className="border-2 border-black rounded w-[20rem] md:w-[20rem] h-14 text-center text-[20px]"
                          type="text"
                          placeholder="Masukkan Kode OTP"
                          name="otp"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </div>
                      <p className="tulisan text-xs md:text-lg">Harap masukkan kode OTP</p>
                      <button
                        type="button"
                        className=" border-2 bg-red text-xs md:text-lg text-white rounded-lg py-2 px-3 mt-5"
                        onClick={checkVerification}
                      >
                        Kirim OTP
                      </button>
                      <br />
                    </form>
                  </div>
                </div>
              </div>
              <Transition.Root show={modalIsOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    initialFocus={cancelButtonRef}
                    onClose={setModalIsOpen}
                >
                  <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                  >
                      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>

                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                          <Transition.Child
                              as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                              enterTo="opacity-100 translate-y-0 sm:scale-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                          >
                              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                      <div className="sm:flex sm:items-start">
                                          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                              {/* conditional rendering icon when error and success */}
                                              {errorMessage ? (
                                                  <ExclamationTriangleIcon
                                                      className="h-6 w-6 text-red"
                                                      aria-hidden="true"
                                                  />
                                              ) : (
                                                  <CheckCircleIcon
                                                      className="h-6 w-6 text-green-600"
                                                      aria-hidden="true"
                                                  />
                                              )}
                                          </div>
                                          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                              <Dialog.Title
                                                  as="h3"
                                                  className="text-xl font-semibold leading-6 text-gray-900"
                                              >
                                              {/* conditional rendering title when error and when success */}
                                                  {errorMessage
                                                      ? errorMessage
                                                      : modalContent}
                                              </Dialog.Title>
                                              <div className="mt-2">
                                                  <p className="text-sm text-gray-500">
                                                  {/* conditional rendering subtitle when error and when success */}
                                                      {errorMessage
                                                          ? errorMessage
                                                          : modalContent}
                                                  </p>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                      {errorMessage ? (
                                          <button
                                              type="button"
                                              className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white bg-red shadow-sm hover:bg-white hover:text-red hover:border-red hover:border-2 sm:ml-3 sm:w-auto"
                                              onClick={() =>
                                                  setModalIsOpen(false)
                                              }
                                          >
                                              Okee
                                          </button>
                                      ) : (
                                          <a
                                              type="button"
                                              className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white bg-green-600 shadow-sm hover:bg-white hover:text-green-600 hover:border-green-600 hover:border-2 sm:ml-3 sm:w-auto"
                                              onClick={() =>
                                                  setModalIsOpen(false)
                                              }
                                              
                                          >
                                              Oke
                                          </a>
                                      )}

                                      <button
                                          type="button"
                                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                          onClick={() => setModalIsOpen(false)}
                                          ref={cancelButtonRef}
                                      >
                                          Cancel
                                      </button>
                                  </div>
                              </Dialog.Panel>
                          </Transition.Child>
                      </div>
                  </div>
                </Dialog>
            </Transition.Root>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
