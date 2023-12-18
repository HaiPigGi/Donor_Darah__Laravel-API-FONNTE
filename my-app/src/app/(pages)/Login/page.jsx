"use client";
import React, { useState, useEffect} from 'react';
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



export default function Login() {
  const [session, setSession] = useState({});
  const [telepon, setTelepon] = useState("");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const apiUrl = process.env.NEXT_PUBLIC_APP_URL_API;

  useEffect(() => {
    // Simulate a delay (e.g., API request)
    const delay = setTimeout(() => {
      setLoading(false);
    }, 2500);

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

  const sendCodeLogin = async () => { 

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
        setErrorMessage("");
        setModalContent('berhasil Kirim');
        // Redirect to the   OTP page
        redirectToOtherPage();
      } else {
        setErrorMessage("Code Send failed. Please try again.");
        setModalIsOpen(true)
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      // Set loading to false when the process is complete (either success or failure)
      setLoading(false);
    }
  };

  const check = () => {
    const cekIncludeString = telepon.match(/\d+/g);
    if(telepon == ""){
      setErrorMessage("Nomor telfon masih kosong");
      setModalIsOpen(true);
    }else if(cekIncludeString == null){
      setErrorMessage("Harap isi dengan nomor telfon");
      setModalIsOpen(true);
    }
    else{
      setErrorMessage("");
      sendCodeLogin();
    }
  };

  const handleApiError = (error) => {
    if (error.response ) {
       console.error("Server responded with error status:", error.response.status);
        if(error.response.status === 401){
          setErrorMessage("Nomor belum terdaftar");
          setModalIsOpen(true);
        }

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

  const router = useRouter();

  const redirectToOtherPage = () => {
    router.push("/Login/OTP");
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
                  <div className="wraper text-center">
                    <form className="w-full h-full p-5 relative">
                      <h1 className="text-black font-Title text-[40px] w-full block left-0 absolute top-16">LOGIN</h1>
                      <div className="flex justify-center items-center h-full my-auto">
                        <div className="">
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
                              className="border-2 border-black rounded w-full md:w-[23rem] h-14 ps-[4rem] text-lg md:text-[25px]"
                              type="text"
                              placeholder="Masukkan No Anda"
                              name="telepon"
                              value={telepon}
                              onChange={(e) =>{
                                setTelepon(e.target.value)
                              }}
                            />
                          </div>
                          <p className="text-sm md:text-l text-left mt-2 col-start-1 col-span-3 my-auto mx-auto w-full">Kode OTP dikirim via Whatsapp</p>
                          <div className="absolute right-0 bottom-0 flex items-center justify-center md:justify-end space-x-5 p-5">
                            <a href="/register" className="text-l font-bold text-red border-b border-red">Register</a>
                            <button 
                              type="button"
                              className="font-bold text-l text-white rounded-lg px-3 py-2 h-12 w-40 bg-red" onClick={check} > 
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
      </section>
  );
}
