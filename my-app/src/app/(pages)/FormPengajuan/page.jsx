"use client";
import axios from "axios";
import Navbar from "@/_components/navbar";
import "@/_styles/css/login.css";
import "@/_styles/css/regis.css";
import { useState } from "react";
import Hal1 from "./hal1";
import Hal2 from "./hal2";
import { useEffect } from "react";
import Loading from "@/_components/Loading/Loading";
import withAuth from "@/_components/Auth/WithAuth";

const FormPengajuan = () => {
  const [data, setData] = useState({
    "nama" : "",
  "telepon" : "",
  "golongan_darah" : "",
  "provinsi_id" : "",
  "kabupaten_id" : "",
  "kecamatan_id" : "",
  "kelurahan_id" : ""});
  const [session, setSession] = useState({});
  const [buttonNext, setButtonNext] = useState(0);

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

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
  
  async function registrasi() {
    try{
      await axios.post(
        `${apiUrl}/api/register/auth`,
        data,{
          headers: {
            "csrf_token" : session.csrf_token,
            "session_data" : session.session_data
          }
        }
        );
      } catch (error) {
        alert(error);
      }
    }
    
    useState({
      registrasi
    },[])

  const getcsrf = async () => {
    let cookie = await axios.get(`${apiUrl}/api/senctum/csrf-cookie`)
    setSession(cookie)
  }

  const handleButton = () => {
    setButtonNext(buttonNext + 1);
    const pagi = document.getElementById("pagination").childNodes[buttonNext + 1];
    console.log(pagi);
    pagi.classList.remove("border-2");
    pagi.classList.remove("border-red");
    pagi.classList.add("bg-red");
  }
  
  const handleKembali = () =>{
    const pagi0 = document.getElementById("pagination").childNodes[buttonNext];
    setButtonNext(buttonNext - 1);
    pagi0.classList.remove("bg-red");
    pagi0.classList.add("border-2");
    pagi0.classList.add("border-red");
  }

  const Buttons = () => {
    if(buttonNext == 0){
     return  (
      <div className="w-full flex justify-end py-2">
            <button 
                className="border-2 rounded-full px-3 py-3 bg-red text-white "
                type="button"
                onClick={handleButton}
                >
               Selanjutnya
            </button>
      </div>
     )

    }else if(buttonNext == 1){
      return (
        <div className="w-full  flex justify-between py-2">
            <button 
                className="border-2 border-red rounded-full px-4 py-3 text-red "
                type="button"
                onClick={handleKembali}
                >
               kembali
             </button>
            <a 
                className="border-2 rounded-full px-5 py-3 bg-red text-white "
                href="/Dashboard"
                >
               submit
             </a>
        </div>
      )
    }
  };

  const Pages= () => {
    if(buttonNext == 0){
      return <Hal1/>
    }else if(buttonNext == 1){
      return <Hal2 />
    }
  }

  

  return (
    <section>
      <div className="my-bg">
      <div>
          {loading ? (
            <Loading progress={progress} />
          ) : (
            <div>
        <Navbar itemsColor="text-white" />
        <div className="row">
            <div className="w-[70%] h-[80%] bg-white rounded-xl">
              <div className="flex items-end justify-center w-full h-full text-center relative pb-[4%]">
                <div className="absolute top-[4%] w-full">
                  <h1 className="text-black font-Title text-[40px] block top-[4%] ">
                    Form ajuan kebutuhan darah
                  </h1>
                  <div className=" flex justify-center items-center  mx-auto" id="pagination">
                    <div className="w-14 h-3 bg-red me-2 rounded-full"></div>
                    <div className="w-14 h-3  rounded-full border-2 border-red"></div>
                  </div>
                </div>
                <form className="font-Subtitle  px-10">
                      <Pages/>
                      <Buttons />
                </form>
              </div>
            </div>
          </div>
          </div>
          )}
        </div>
        </div>
    </section>
  );
}

export default FormPengajuan;
