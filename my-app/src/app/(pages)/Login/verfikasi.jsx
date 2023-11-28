"use client";
import { useState } from "react";
import axios from 'axios';
import "@/_styles/css/login.css";
import Navbar from "@/_components/navbar";

export default function Verifikasi() {
  const [session, setSession] = useState({});
  const [modalContent, setModalContent] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [code, setCode] = useState("");

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setCode(inputValue);
    sessionStorage.setItem(inputValue)
    console.log("Code input:", inputValue);
  };

  const verifyCodeLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/verify/otp/login", {
        code: code,
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

  return (
    <>
      <div className="my-bg">
        <Navbar itemsColor="text-white" />
        <div className="row">
          <div className="bg-white bg-no-repeat bg-cover bg-center rounded-lg" style={{ width: "35rem", height: "25rem" }}>
            <div className="wraper text-center">
              <form className="w-full h-full p-5 relative">
                <h1 className="text-black font-Title text-[40px] w-full block left-0 absolute">
                  verifikasi
                </h1>
                <div className="flex justify-center items-center h-full my-auto ">
                  <div className="text-center">
                    <img
                      className="mx-auto mt-8"
                      src="/img/ic_baseline-whatsapp.svg"
                      alt="Icon"
                      height={100}
                      width={100}
                    />
                    <p>Kode OTP dikirim ke nomer :</p>
                    <p className="font-bold">nomer Hp</p>
                    <div>
                      <input
                        value={code}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Masukan Kode OTP"
                        className="mt-1 p-2 border border-black rounded-md w-80 text-center"
                      />
                    </div>
                    <p className="mt-3 mb-5">
                      <a href="#" className="border-b border-black">
                        Kirim ulang{" "}
                      </a>{" "}
                      atau{" "}
                      <a href="#" className="border-b border-black">
                        ganti nomor
                      </a>
                    </p>
                    <div className="" style={{ marginLeft: "23rem" }}>
                      <button
                        type="button"
                        className="border-1 bg-red text-l font-bold p-2 text-white rounded-e-[25px] rounded-s-[5px] flex items-center font-Subtitle"
                      >
                        Selanjutnya
                        <img src="/img/ArrowNext.svg" alt="" className="ps-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
