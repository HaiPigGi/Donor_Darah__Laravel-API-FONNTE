"use client";
import axios from "axios";
import Navbar from "@/_components/navbar";
import "@/_styles/css/login.css";
import "@/_styles/css/regis.css";
import Hal1 from "./hal1";
import Hal2 from "./hal2";
import { useEffect } from "react";
import Loading from "@/_components/Loading/Loading";
import withAuth from "@/_components/Auth/WithAuth";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
    ExclamationTriangleIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";

const FormPengajuan = () => {
    const [session, setSession] = useState({});
    const [buttonNext, setButtonNext] = useState(0);

    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    const [error, setError] = useState("");

    const [openError, setOpenError] = useState(false);
    const cancelButtonRef = useRef(null);
    const [data, setData] = useState({
        nama: "",
        telepon: "",
        ktp: "",
        golongan_darah: "",
        jumlah_kantong: "",
        kelurahan_id: "",
        tujuan_pengajuan: "",
    });

    const apiUrl = process.env.NEXT_PUBLIC_APP_URL_API;

    useEffect(() => {
        // Simulate a delay (e.g., API request)
        const delay = setTimeout(() => {
            setLoading(false);
        }, 4500);

        // Update progress every 50ms until it reaches 100%
        const progressInterval = setInterval(() => {
            setProgress((prevProgress) =>
                prevProgress < 100 ? prevProgress + 1 : prevProgress,
            );
        }, 50);

        // Cleanup the timeout and interval to avoid memory leaks
        return () => {
            clearTimeout(delay);
            clearInterval(progressInterval);
        };
    }, []);

    const getcsrf = async () => {
        let cookie = await axios.get(`${apiUrl}/api/senctum/csrf-cookie`);
        setSession(cookie);
    };

    const cekAllFilled = () => {
        console.log("openError from cekAllFilled : ", openError);
        if (
            data.nama == "" ||
            data.ktp == "" ||
            data.telepon == "" ||
            data.golongan_darah == "" ||
            data.kelurahan_id == "" ||
            data.jumlah_kantong == ""
        ) {
            console.log(data);
            setError("Ada data yang belum diisi");
            setOpenError(true);
            console.log("openError from cekAllFilled2 : ", openError);
        } else {
            setError("");
            setOpenError(false);
            sendForm();
        }
    };

    const sendForm = async () => {
        try {
            await axios.post(`${apiUrl}/api/form/akseptor-send`, data, {
                headers: {
                    csrf_token: session.csrf_token,
                    session_data: session.session_data,
                },
            });
            setOpenError(true);
        } catch (error) {
            console.log("Error From formPengajuan Page.jsx : ", error);
        }
    };
    const Buttons = () => {
        if (buttonNext == 0) {
            return (
                <div className="w-full flex justify-end py-2">
                    <button
                        className="border-2 rounded-full px-3 py-3 bg-red text-white "
                        type="button"
                        onClick={cekAllFilled}
                    >
                        Kirim Pengajuan
                    </button>
                </div>
            );
        }
    };

    return (
        <section>
            <div className="my-bg">
                <div>
                    {loading ? (
                        <Loading progress={progress} />
                    ) : (
                        <div>
                            <Navbar itemsColor="text-white" />
                            <div className=" h-screen flex items-center">
                                <div className="w-[70%] h-auto bg-white rounded-xl mx-auto ">
                                    <div className="mt-2 w-full">
                                        <h1 className="text-black font-Title text-[40px] block text-center">
                                            Form ajuan kebutuhan darah
                                        </h1>
                                    </div>
                                    <div className="flex pt-2 justify-center w-full h-full text-center ">
                                        <form className="font-Subtitle w-full px-5">
                                            <Hal1
                                                action={(newValue) => {
                                                    setData(newValue);
                                                }}
                                                data={data}
                                            />
                                            <Buttons />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Transition.Root show={openError} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    initialFocus={cancelButtonRef}
                    onClose={setOpenError}
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
                                                {error ? (
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
                                                    {error
                                                        ? error
                                                        : "Form berhasil dikirim"}
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        {error
                                                            ? error
                                                            : "kebutuhan darah akan dibroadcast ke seluruh pendonor"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        {error ? (
                                            <button
                                                type="button"
                                                className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white bg-red shadow-sm hover:bg-white hover:text-red hover:border-red hover:border-2 sm:ml-3 sm:w-auto"
                                                onClick={() =>
                                                    setOpenError(false)
                                                }
                                            >
                                                Deactivate
                                            </button>
                                        ) : (
                                            <a
                                                type="button"
                                                className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white bg-green-600 shadow-sm hover:bg-white hover:text-green-600 hover:border-green-600 hover:border-2 sm:ml-3 sm:w-auto"
                                                onClick={() =>
                                                    setOpenError(false)
                                                }
                                                href="/"
                                            >
                                                Okee
                                            </a>
                                        )}

                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpenError(false)}
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
};

export default FormPengajuan;
