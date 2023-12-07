"use client";
import Navbar from "@/_components/navbar";
import "@/_styles/css/login.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { NextResponse } from "next/server";

export default function Otp() {
  const [session, setSession] = useState({})
  const [data,setData] = useState();
  const apiUrl = process.env.NEXT_PUBLIC_APP_URL_API;

  const getcsrf = async () => {
    try{
      let csrf = await axios.get(`${apiUrl}/api/get-session-data`)
      console.log(csrf.data)  
      setSession(csrf.data)

    }catch(e){
      alert(e.message)
    }
  }

  useEffect(() => {
    getcsrf();
  },[])

  async function verification(){
    try{
      setData({
        "code" :  (document.getElementById("kodeOTP").value)
      })
      console.log(data)
      console.log(session.csrf_token)
      await axios.post(`${apiUrl}/api/register/auth/verify`,
      data,
      {
        headers:{
          "csrf_token" : session.csrf_token,
          "session_data" : session.session_data
        }
      }
    );
    }catch(e){
      alert(e.message);
    };
  }

  return (
    <main>
      <div className="my-bg">
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
                          />
                <p className="tulisan text-xs"></p>
                <button type="button" className=" border-2 bg-red text-xs text-white rounded-lg py-2 px-3 mt-5" onClick={verification}>
                  Kirim Kode OTP
                </button>
                <br/>
                <a href="/Login" className="text-xs">Sudah Memiliki Akun</a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
