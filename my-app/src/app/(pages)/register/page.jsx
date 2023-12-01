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
import ErrorMessage from "@/_components/errorMessage";
import { Modal } from "react-bootstrap";
import moment from 'moment';

export default function Register() {

  const isBrowser = typeof window !== "undefined";

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [session, setSession] = useState({});
  const [buttonNext, setButtonNext] = useState(0);

  const [data, setData] = useState({
    nama: "",
    telepon: "",
    ktp: "",
    code: "",
    golongan_darah: "",
    pekerjaan: "",
    kelurahan_id: "",
  });

  // useEffect(() => {
  //   // Check if sessionStorage is available
  //   if (typeof window !== 'undefined') {
  //     // Retrieve data from sessionStorage when the component mounts
  //     setData((prevData) => ({
  //       ...prevData,
  //       nama: sessionStorage.getItem("nama") || "",
  //       telepon: sessionStorage.getItem("telepon") || "",
  //       ktp: sessionStorage.getItem("ktp") || "",
  //       code: sessionStorage.getItem("code") || "",
  //       golongan_darah: sessionStorage.getItem("golongan_darah") || "",
  //       pekerjaan: sessionStorage.getItem("pekerjaan") || "",
  //       kelurahan_id: sessionStorage.getItem("kelurahan_id") || "",
  //     }));
  //   }
  // }, []);
 
  
  const SendCode = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/register/auth",
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
      "http://localhost:8000/api/register/auth/verify",
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
    SendCode
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
  console.log('Data before axios request:', data);

  try {
    const formattedData = {
      golongan_darah: data.golongan_darah,
      pekerjaan: data.pekerjaan,
      kelurahan_id: parseInt(data.kelurahan_id),
    };
    console.log()

    const response = await axios.post(
      "http://localhost:8000/api/register/auth/create",
      {
        nama: String(data.nama), // Convert to string
        telepon: String(data.telepon), // Convert to string
        ktp: String(data.ktp),
        golongan_darah: String(data.golongan_darah),
        pekerjaan: String(data.pekerjaan),
        kelurahan_id: parseInt(data.kelurahan_id),
      },
      {
        headers: {
          csrf_token: session.csrf_token,
          // session_data: session.session_data,
        },
      }
    );

    console.log('Axios response:', response);

    if (response.status === 200) {
      setModalContent("Account Successfully Created");
      setModalIsOpen(true);

      // clearSession();
    } else {
      setErrorMessage("Account Verification failed. Please try again.");
      // clearSession();
    }
  } catch (error) {
    console.error("AxiosError:", error);
    setErrorMessage("An error occurred. Please try again later.");
    // clearSession();
  }
};

  const getcsrf = async () => {
    let cookie = await axios.get("http://localhost:8000/api/get-session-data");
    setSession(cookie);
  };

  const handleButton = () => {
    const pagi = document.getElementById("pagination").childNodes[buttonNext + 1];
  
    if (pagi) {
      setButtonNext(buttonNext + 1);
      console.log(buttonNext);
      formRendering();
      pagi.classList.remove("border-2");
      pagi.classList.remove("border-red");
      pagi.classList.add("bg-red");
    }
  };
  
  
  const handleKembali = () => {
    const pagi = document.getElementById("pagination").childNodes[buttonNext];
    setButtonNext(buttonNext - 1);
    pagi.classList.remove("bg-red");
    pagi.classList.add("border-2");
    pagi.classList.add("border-red");
  };

  const nextButton = () => {
    if(buttonNext == 0){
      return <button
                    type="button"
                    onClick={() => {
                      handleButton();
                      SendCode(); // Invoke the registrasi function when the button is clicked
                    }}
                    className="border-2 bg-red text-l font-bold p-3 text-white rounded-e-[25px] rounded-s-[5px] flex justify-center items-center font-Subtitle"
                  >
                    Selanjutnya
                    <img src="/img/ArrowNext.svg" alt="" className="ps-2" />
                  </button>;

    }else if (buttonNext == 1){
      return (
        <div className="flex justify-between w-full mx-2">
          <button
            type="button"
            onClick={handleKembali}
            className="border-2 border-red bg-transparent text-l font-bold p-3 text-red rounded-l-[25px] rounded-s-[5px] flex justify-center items-center "
          >
            <img src="/img/Vector (1).svg" alt="" className="ps-2 mr-2" />
            Kembali
          </button>

          <button
            type="button"
            onClick={() => {
              handleButton();
              verifyCode(); 
            }}
            className="border-2 bg-red text-l font-bold p-3 text-white rounded-e-[25px] rounded-s-[5px] flex justify-center items-center"
          >
            Kirim OTP
            <img src="/img/ArrowNext.svg" alt="" className="ms-3" />
          </button>
        </div>
      )
    }else if(buttonNext == 2){
      // registrasi();
      return(
        <div className="flex justify-between w-full mx-2">
          <button
            type="button"
            onClick={handleKembali}
            className="border-2 border-red bg-transparent text-l font-bold p-3 text-red rounded-l-[25px] rounded-s-[5px] flex justify-center items-center "
          >
            <img src="/img/Vector (1).svg" alt="" className="ps-2 mr-2" />
            Kembali
          </button>

          <button
            type="button"
            onClick={handleButton}
            className="border-2 bg-red text-l font-bold p-3 text-white rounded-e-[25px] rounded-s-[5px] flex justify-center items-center"
          >
            Selanjutnya
            <img src="/img/ArrowNext.svg" alt="" className="ms-3" />
          </button>
        </div>
      )
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
            <img src="/img/Vector (1).svg" alt="" className="ps-2 mr-2" />
            Kembali
          </button>
    
          <button
            type="button"
            onClick={() => {
              handleButton();
              finalVerifyData();
            }}
            className="border-2 bg-red text-l font-bold p-3 text-white rounded-e-[25px] rounded-s-[5px] flex justify-center items-center"
          >
            Selesai
            <img src="/img/ArrowNext.svg" alt="" className="ms-3" />
          </button>
        </div>
      );
    }
    
  }

  const formRendering = () => {
    if(buttonNext == 0){
      return <DataDiri data={data} action = {(newValue) => {setData(newValue)}}/>
    }else if (buttonNext == 1){
      document.getElementById("title").classList.remove("block");
      document.getElementById("title").classList.add("hidden");
      return <Verfikasi data = {data} action ={(newValue) => {setData(newValue)}}/>
    }else if(buttonNext == 2){
      document.getElementById("title").classList.remove("hidden");
      document.getElementById("title").classList.add("block");
      return <DataDiri2 data={data} action={(newValue)=>{setData(newValue)}} />;
    }else if(buttonNext == 3){
      document.getElementById("title").classList.remove("hidden");
      document.getElementById("title").classList.add("block");
      return <Alamat data={data} action={(newValue)=>{setData(newValue)}}/>;
    }
  }

  return (
    <section>
      <div className="my-bg">
        <Navbar itemsColor="text-white"/>
        <div className="row">
          <div className="rectangle-37">
            <div className="wraper text-center relative">
              <h1 id="title" className="text-black font-Title text-[40px] block absolute top-[4%]">
                Register
              </h1>
                  <div className=" flex justify-center items-center  mx-auto absolute top-[17%]" id="pagination">
                    <div className="w-14 h-3 bg-red me-2 rounded-full"></div>
                    <div className="w-14 h-3  rounded-full border-2 border-red me-2"></div>
                    <div className="w-14 h-3  rounded-full border-2 border-red me-2"></div>
                    <div className="w-14 h-3  rounded-full border-2 border-red"></div>
                  </div>
              <form className="w-full px-5 py-50 font-Subtitle mt-10">
                { formRendering() }
                <div className="flex justify-end px-[5rem]">
                  { nextButton() }
                </div>
              </form>

             
            </div>
          </div>
        </div>
      </div>
        {/* Modal for success message */}
        <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)} contentLabel="Registration Modal" dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>{modalContent}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Check Your WhatsApp Number To See Verification Code</p>
        </Modal.Body>
        <Modal.Footer>
              <button
          onClick={() => setModalIsOpen(false)}
          className="custom-close-button" // Add a custom class for styling
        >
          Close
        </button>
        </Modal.Footer>
      </Modal>

      {/* Error message */}
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          kelas="w-full h-auto bg-red text-white absolute left-[-1px] bottom-[-50px] rounded-xl p-2"
        />
      )}
    </section>
  );
}