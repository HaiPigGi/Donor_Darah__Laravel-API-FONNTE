"use client";
import { Suspense, useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/_components/navbar";
import Dropdown from "@/_components/Dropdown/dropdown";
import "@/_styles/css/login.css";
import "@/_styles/css/regis.css";
import DataDiri from "./DataDiri";
import DataDiri2 from "./DataDiri2";
import Alamat from "./Alamat";
import Verfikasi from "./verifikasi";
import { Modal } from "react-bootstrap";
import moment from "moment";
import Loading from "@/_components/Loading/Loading";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import {
    ExclamationTriangleIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";



export default function Register() {
    const isBrowser = typeof window !== "undefined";

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const cancelButtonRef = useRef(null);


    const [session, setSession] = useState({});
    const [buttonNext, setButtonNext] = useState(0);
    const [judul, setJudul] = useState("Registrasi");
    
    const apiUrl = process.env.NEXT_PUBLIC_APP_URL_API;


    const [data, setData] = useState({
        nama: "",
        telepon: "",
        ktp: "",
        code: "",
        golongan_darah: "",
        pekerjaan: "",
        kelurahan_id: "",
    });

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

    const SendCode = async () => {
        try {
            const response = await axios.post(
                `${apiUrl}/api/register/auth`,
                {
                    nama: String(data.nama), // Convert to string
                    telepon: String(data.telepon), // Convert to string
                    ktp: String(data.ktp),
                },
                {
                    headers: {
                        csrf_token: session.csrf_token,
                        // session_data: session.session_data,
                    },
                }
            );

            if (response.status === 200) {
                // Registration successful
                setModalContent("Code Sent Successfully");
                setModalIsOpen(true);
                // Clear values from sessionStorage
            } else {
                // Registration failed, show an error message
                setErrorMessage("Code Send failed. Please try again.");
            }
        } catch (error) {
            // An error occurred during the registration process
            setErrorMessage("An error occurred. Please try again later.");
            console.error(error); // Log the detailed error to the console
        }
    };

    const verifyCode = async () => {
        console.log("isi dari Code : ", data.code);
        try {
            const response = await axios.post(
                `${apiUrl}/api/register/auth/verify`,
                {
                    code: data.code,
                },
                {
                    headers: {
                        csrf_token: session.csrf_token,
                    },
                }
            );
            if (response.status === 200) {
                // Verification successful
                setModalContent("Code Verified Successfully");
                setModalIsOpen(true);
            } else {
                // Verification failed, show an error message
                setErrorMessage("Code Verification failed. Please try again.");
            }
        } catch (error) {
            // Log the detailed error to the console
            console.error("AxiosError:", error);
            // An error occurred during the registration process
            setErrorMessage("An error occurred. Please try again later.");
        }
    };

    useState(
        {
            SendCode,
        },
        []
    );

    const clearSession = () => {
        // Clear values from sessionStorage
        const keysToRemove = [
            "nama",
            "telepon",
            "ktp",
            "code",
            "golongan_darah",
            "pekerjaan",
            "kelurahan_id",
        ];

        keysToRemove.forEach((key) => sessionStorage.removeItem(key));
    };

    const finalVerifyData = async () => {
        try {
            const formattedData = {
                golongan_darah: data.golongan_darah,
                pekerjaan: data.pekerjaan,
                kelurahan_id: parseInt(data.kelurahan_id),
            };
            console.log();

            const response = await axios.post(
                `${apiUrl}/api/register/auth/create`,
                {
                    nama: String(data.nama), // Convert to string
                    telepon: String(data.telepon), // Convert to string
                    ktp: String(data.ktp),
                    golongan_darah: String(data.golongan_darah),
                    pekerjaan: String(data.pekerjaan),
                    kelurahan_id: (data.kelurahan_id),
                },
                {
                    headers: {
                        csrf_token: session.csrf_token,
                        // session_data: session.session_data,
                    },
                }
            );

            console.log("Axios response:", response);

            if (response.status === 200) {
                const jwtToken = response.data.token;
                const userRoleFromResponse = response.data.role; //Get the user role
                const getUserId = response.data.id; 
                // Store the JWT token in session storage
                sessionStorage.setItem('jwtToken', jwtToken);
                sessionStorage.setItem('userRole', userRoleFromResponse);
                sessionStorage.setItem('userId', getUserId);
                setModalContent("Account Successfully Created");
                setModalIsOpen(true);
                window.location.href = "/";
                // clearSession();
            } else {
                setErrorMessage(
                    "Account Verification failed. Please try again."
                );
                // clearSession();
            }
        } catch (error) {
            console.error("AxiosError:", error);
            setErrorMessage("An error occurred. Please try again later.");
            // clearSession();
        }
    };

    const getcsrf = async () => {
        let cookie = await axios.get(
            `${apiUrl}/api/get-session-data`
        );
        setSession(cookie);
    };

    const handleButton = () => {
        const pagi =
            document.getElementById("pagination").childNodes[buttonNext + 1];

        if (pagi) {
            setButtonNext(buttonNext + 1);
            console.log(buttonNext);
            formRendering();
            pagi.classList.remove("border-2");
            pagi.classList.remove("border-red");
            pagi.classList.add("bg-red");
        }
    };

    const clear = () => {
        if (buttonNext == 1) {
            setData({
                nama: "",
                telepon: "",
                ktp: "",
                code: "",
                golongan_darah: "",
                pekerjaan: "",
                kelurahan_id: "",
            });
        } else if (buttonNext == 3) {
        }
    };

    const userExist = async () => {
        try {
            const response = await axios.post(
                `${apiUrl}/api/check-number/telepon`,
                {
                    telepon: String(data.telepon), // Convert to string
                },
                {
                    headers: {
                        csrf_token: session.csrf_token,
                        // session_data: session.session_data,
                    },
                }
            );
            if (response.data.message == "Phone number is available") {
                setErrorMessage("");
                SendCode();
                handleButton();
            } else {
                setErrorMessage("Nomor sudah terdaftar");
                formRendering();
            }
        } catch (error) {}
    };

    const check = () => {
        setErrorMessage("");
        if (buttonNext == 0) {
            console.log(data);
            if (data.nama == "" || data.telepon == "" || data.ktp == "") {
                setErrorMessage("terdapat data yang belum diisi");
                setModalIsOpen(true);
            } else {
                setErrorMessage("");
                setJudul("Verifikasi");
                console.log("button next : " + buttonNext);
                userExist();
            }
        } else if (buttonNext == 1) {
            if (data.code == "") {
                setErrorMessage("terdapat data yang belum diisi");
            } else {
                setErrorMessage("");
                setJudul("Registrasi");
                handleButton();
                verifyCode();
            }
        } else if (buttonNext == 2) {
            if (data.pekerjaan == "" || data.golongan_darah == "") {
                setErrorMessage("terdapat data yang belum diisi");
            } else {
                setErrorMessage("");
                setJudul("Registrasi");
                handleButton();
            }
        } else if (buttonNext == 3) {
            if (data.kelurahan_id == "") {
                setErrorMessage(
                    "Kelurahan belum diisi harap isi/pilih kembali kelurahan"
                );
            } else {
                setErrorMessage("");
                setJudul("Registrasi");
                handleButton();
                finalVerifyData();
            }
        }
    };

    const handleKembali = () => {
        const pagi =
        document.getElementById("pagination").childNodes[buttonNext];
        setButtonNext(buttonNext - 1);
        pagi.classList.remove("bg-red");
        pagi.classList.add("border-2");
        pagi.classList.add("border-red");
    };

    const nextButton = () => {
        if (buttonNext == 0) {
            return (
                <button
                    type="button"
                    onClick={() => {
                        check();
                    }}
                    className="border-2 bg-red text-l font-bold p-3 text-white rounded-e-[25px] rounded-s-[5px] flex justify-center items-center font-Subtitle"
                >
                    Selanjutnya
                    <img src="/img/ArrowNext.svg" alt="" className="ps-2" />
                </button>
            );
        } else if (buttonNext == 1) {
            return (
                <div className="flex justify-between w-full mx-2">
                    <button
                        type="button"
                        onClick={() => {
                            handleKembali();
                            clear();
                        }}
                        className="border-2 border-red bg-transparent text-l font-bold p-3 text-red rounded-l-[25px] rounded-s-[5px] flex justify-center items-center "
                    >
                        <img
                            src="/img/Vector (1).svg"
                            alt=""
                            className="ps-2 mr-2"
                        />
                        Kembali
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            check();
                        }}
                        className="border-2 bg-red text-l font-bold p-3 text-white rounded-e-[25px] rounded-s-[5px] flex justify-center items-center"
                    >
                        Kirim OTP
                        <img src="/img/ArrowNext.svg" alt="" className="ms-3" />
                    </button>
                </div>
            );
        } else if (buttonNext == 2) {
            // registrasi();
            return (
                <div className="flex justify-end   w-full mx-2">
                    <button
                        type="button"
                        onClick={() => {
                          check();
                        }}
                        className="border-2 bg-red text-l font-bold p-3 text-white rounded-e-[25px] rounded-s-[5px] flex justify-center items-center"
                    >
                        Selanjutnya
                        <img src="/img/ArrowNext.svg" alt="" className="ms-3" />
                    </button>
                </div>
            );
        } else if (buttonNext === 3) {
            return (
                <div className="flex justify-between w-full mx-2">
                    <button
                        type="button"
                        onClick={() => {
                            handleKembali();
                            handleButton();
                        }}
                        className="border-2 border-red bg-transparent text-l font-bold p-3 text-red rounded-l-[25px] rounded-s-[5px] flex justify-center items-center "
                    >
                        <img
                            src="/img/Vector (1).svg"
                            alt=""
                            className="ps-2 mr-2"
                        />
                        Kembali
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            check();
                        }}
                        className="border-2 bg-red text-l font-bold p-3 text-white rounded-e-[25px] rounded-s-[5px] flex justify-center items-center"
                    >
                        Selesai
                        <img src="/img/ArrowNext.svg" alt="" className="ms-3" />
                    </button>
                </div>
            );
        }
    };
    const formRendering = () => {
        if (buttonNext == 0) {
            return (
                <DataDiri
                    data={data}
                    action={(newValue) => {
                        setData(newValue);
                    }}
                />
            );
        } else if (buttonNext == 1) {
            return (
                <Verfikasi
                    data={data}
                    action={(newValue) => {
                        setData(newValue);
                    }}
                />
            );
        } else if (buttonNext == 2) {
            return (
                <DataDiri2
                    data={data}
                    action={(newValue) => {
                        setData(newValue);
                    }}
                />
            );
        } else if (buttonNext == 3) {
            document.getElementById("title").classList.remove("hidden");
            document.getElementById("title").classList.add("block");
            return (
                <Alamat
                    data={data}
                    action={(newValue) => {
                        setData(newValue);
                    }}
                />
            );
        }
    };

    return (
        <section className="h-screen overflow-hidden relative">
             <div className="my-bg h-full bg-cover bg-center">
                <div className="">
                    {loading ? (
                        <Loading progress={progress} />
                    ) : (
                        <div>
                            <Navbar itemsColor="text-white" />
                            <div className="row ">
                                <div className="bg-white h-auto mx-5 md:w-1/2 rounded-3xl">
                                    <div className=" flex items-center text-center w-auto">
                                        <form className="w-full px-5 font-Subtitle py-5 grid grid-rows-3">
                                            <div className="h-auto row-span-3">
                                                <h1
                                                    id="title"
                                                    className="text-black font-Title text-4xl md:text-5xl block"
                                                >
                                                    {judul}
                                                </h1>
                                                <div
                                                className=" flex justify-center items-center mx-auto mt-2"
                                                    id="pagination"
                                                >
                                                    <div className="w-14 h-3 bg-red me-2 rounded-full"></div>
                                                    <div className="w-14 h-3  rounded-full border-2 border-red me-2"></div>
                                                    <div className="w-14 h-3  rounded-full border-2 border-red me-2"></div>
                                                    <div className="w-14 h-3  rounded-full border-2 border-red"></div>
                                                </div>
                                            </div>
                                            <div className=" row-span-2">
                                                {formRendering()}
                                            </div>
                                            <div className=" mx-auto row-span-1 mt-5">
                                                {nextButton()}
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
                                                Oke
                                            </button>
                                        ) : (
                                            <a
                                                type="button"
                                                className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white bg-green-600 shadow-sm hover:bg-white hover:text-green-600 hover:border-green-600 hover:border-2 sm:ml-3 sm:w-auto"
                                                onClick={() =>
                                                    setModalIsOpen(false)
                                                }
                                                
                                            >
                                                Okee
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
