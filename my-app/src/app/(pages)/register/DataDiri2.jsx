import { useState, Suspense } from "react";
import ErrorMessage from "@/_components/errorMessage";
import Pekerjaan from "@/_components/Dropdown/dropdown_pekerjaan";
import Darah from "@/_components/Dropdown/golongan_darah";

export default function DataDiri2({ data, action }) {
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    

    // Log the data to console
    console.log(`Input data - Name: ${name}, Value: ${value}`);

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
            message="Harap Masukkan Nomor telpon dengan Nomor"
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

    // Call the action function to update the data in the parent component's state
    action({
      ...data,
      [name]: value,
    });
    // Store data in sessionStorage
    sessionStorage.setItem(name, value);
  };

  return (
    <div id="contentRegister" className="mx-auto flex justify-center pt-10">
  <div className="">
    <div className="input-container mb-1 font-Subtitle">
      <div className="absolute bg-black h-14 w-14 z-0 rounded-e-[100px] rounded-s-2xl flex justify-center items-center">
        <img
          className=""
          src="/img/Vector.svg"
          alt="Icon"
          height={25}
          width={25}
        />
      </div>
      <Pekerjaan />
    </div>
    <div className="input-container mb-4 relative font-Subtitle">
      <div className="h-full w-14 bg-black absolute rounded-e-[100px] rounded-s-2xl flex items-center justify-center">
        <img
          className="input-icon "
          src="/img/darah.svg"
          alt="Icon"
          height={30}
          width={30}
        />
      </div>
      <Darah />
    </div>
    <Suspense fallback={<h1>Loading...</h1>}>
      <label htmlFor="" className="pe-[13rem] text-left ">
        Tanggal terakhir donor :{" "}
      </label>
      <div className="h-auto flex justify-start relative font-Subtitle">
        <div className="h-full w-14 bg-black absolute rounded-e-[100px] rounded-s-2xl flex items-center justify-center">
          <img
            className="input-icon "
            src="/img/solar_calendar-bold.svg"
            alt="Icon"
            height={25}
            width={25}
          />
        </div>
        <input
          className="border border-black rounded-xl w-[300px] h-14 ps-[4rem] text-[20px]"
          type="date"
          placeholder="Tanggal lahir"
          name="last_donor" // Update name attribute to "last_donor"
          onChange={handleChange}
        />
      </div>
    </Suspense>
    <div className="flex justify-start items-center mt-2">
      <p className="tulisan text-l">Harap di isi dengan benar</p>
    </div>
    {errorMessage}
  </div>
</div>

  );
}
