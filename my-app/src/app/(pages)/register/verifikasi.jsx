import { useState, useEffect } from "react";

export default function Verifikasi({ data, action }) {
  const [code, setCode] = useState(""); // State to manage OTP code input
  console.log(data);

  // Function to handle input change and save to sessionStorage
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setCode(inputValue);
    sessionStorage.setItem("code", inputValue); // Save code to sessionStorage
    console.log("Code input:", inputValue); // Log the code to the console

    // Call the action function to update the code in the parent component's state
    action({
      ...data,
      code: inputValue,
    });
  };

  useEffect(() => {
    // Set a timeout to remove the code from sessionStorage after 1 minute (60000 milliseconds)
    const timeoutId = setTimeout(() => {
      sessionStorage.removeItem("code");
      console.log("Code removed after 1 minute");

      // Call the action function to update the code in the parent component's state
      action({
        ...data,
        code: "",
      });
    }, 60000);

    // Cleanup the timeout when the component unmounts or when code changes
    return () => clearTimeout(timeoutId);
  }, [code, action, data]);

  return (
    <div className=" w-full h-full">
      <div className="flex justify-center items-center h-full my-auto">
        <div className="text-center">
          <img
            className="mx-auto mt-8"
            src="/img/ic_baseline-whatsapp.svg"
            alt="Icon"
            height={100}
            width={100}
          />
          <p>Kode OTP dikirim ke nomer :</p>
          <p className="font-bold">{data.telepon}</p>
          <div>
            <input
              type="text"
              placeholder="Masukan Kode OTP"
              value={code}
              onChange={handleInputChange}
              className="border border-black rounded-xl w-full sm:w-[370px] h-14 ps-[4rem] text-[20px]"
            />
          </div>
          <p className="mt-3 mb-5">
            <a href="#" className="border-b border-black">
              Kirim ulang{" "}
            </a>{" "}
            atau{" "}
            <a href="#" className="border-b border-black">
              {" "}
              ganti nomor
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
