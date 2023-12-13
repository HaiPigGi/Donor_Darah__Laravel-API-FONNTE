import { useState } from "react";
import ErrorMessage from "@/_components/errorMessage";

export default function DataDiri({ action, data }) {
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value === "") {
      setErrorMessage(
        <ErrorMessage
          message="tidak boleh ada data yang kosong"
          kelas="w-full h-auto bg-red text-white absolute left-[-1px] bottom-[-50px] rounded-xl p-2"
        />
      );
    } else if (name === "telepon" && value === "") {
      let detectNonNumber = value.match(/\D/g);
      if (detectNonNumber !== null) {
        setErrorMessage(
          <ErrorMessage
            message="Harap Masukkan Nomor telepon dengan Nomor"
            kelas="w-[400px] h-auto bg-red text-white absolute left-[-1px] bottom-[-50px] rounded-xl p-2"
          />
        );
        detectNonNumber = "";
      } else {
        setErrorMessage("");
      }
    } else {
      setErrorMessage("");
    }

    // Update state using the action function from props
    action({
      ...data,
      [name]: value,
    });

    // Store data in sessionStorage
    sessionStorage.setItem("nama", data.nama || ""); // Store "nama" in sessionStorage
    sessionStorage.setItem("telepon", data.telepon || ""); // Store "telepon" in sessionStorage
    sessionStorage.setItem("ktp", data.ktp || ""); // Store "ktp" in sessionStorage
  };

  return (
    <div id="contentRegister" className="mx-auto flex justify-center pt-10">
      <div className="w-auto grid grid-rows-3">
        <div className="input-container mb-2 font-Subtitle">
          <div className="absolute bg-black h-14 w-14 z-0 rounded-e-[100px] rounded-s-2xl flex justify-center items-center">
            <img
              className=""
              src="/img/username.svg"
              alt="Icon"
              height={25}
              width={25}
            />
          </div>
          <input
            className="border border-black rounded-xl w-full sm:w-[370px] h-14 ps-[4rem] text-[20px]"
            type="text"
            placeholder="Masukkan nama anda"
            name="nama"
            onChange={handleChange}
          />
        </div>
        <div className="input-container mb-2 relative font-Subtitle">
          <div className="h-14 w-14 bg-black absolute rounded-e-[100px] rounded-s-2xl flex items-center justify-center">
            <img
              className="input-icon "
              src="/img/phone.svg"
              alt="Icon"
              height={30}
              width={30}
            />
          </div>
          <input
            className="border border-black rounded-xl w-full sm:w-[370px] h-14 ps-[4rem] text-[20px]"
            type="text"
            placeholder="Masukan nomor anda"
            name="telepon"
            onChange={handleChange}
          />
        </div>
  
        <div className="input-container relative font-Subtitle">
          <div className="h-14 w-14 bg-black absolute rounded-e-[100px] rounded-s-2xl flex items-center justify-center">
            <img
              className="input-icon "
              src="/img/solar_calendar-bold.svg"
              alt="Icon"
              height={25}
              width={25}
            />
          </div>
          <input
            className="border border-black rounded-xl w-full sm:w-[370px] h-14 ps-[4rem] text-[20px]"
            type="text"
            placeholder="Masukan nomor KTP (16 digit)"
            name="ktp"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-start items-center mt-2">
          <p className="tulisan text-l">Harap di isi dengan benar</p>
        </div>
        {errorMessage}
      </div>
    </div>
  
  );
}
