import { useState, useEffect } from "react";

export let pekerjaan = "";

export default function Pekerjaan({sendToParent}) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
    pekerjaan = e.target.value;
    sendToParent(e.target.value);

    // Store the selected pekerjaan in session storage
    sessionStorage.setItem("pekerjaan", pekerjaan);
    console.log("session dari pekerjaan : ",pekerjaan)

    // If the selected pekerjaan is "lain-lain", store the custom input value
    if (e.target.value === "lain-lain") {
      const customInputValue = document.getElementById("lain-lain-input").value;
      console.log("Custom Input Value:", customInputValue);
      sessionStorage.setItem("lain-lain", customInputValue);
    }
  };

  useEffect(() => {
    // Log the final pekerjaan value to the console after state update
    console.log("Final Pekerjaan Value:", pekerjaan);
  }, [pekerjaan]);

  function Lain_Lain() {
    if (selectedOption === "lain-lain") {
      return (
        <>
          <input
            id="lain-lain-input"
            type="text"
            name="Lain-lain"
            placeholder="Masukkan Nama pekerjaan"
          />
        </>
      );
    }
  }

  return (
    <>
      <select
        className="h-14 w-[400px] border-2 border-stone-950 rounded-md block mb-3 text-[20px] ps-[4rem]"
        value={selectedOption}
        name="pekerjaan"
        onChange={handleDropdownChange}
      >
        <option value="">Pekerjaan</option>
        <option value="TNI/POLRI">TNI/POLRI</option>
        <option value="PegawaiNegeri">Pegawai Negeri</option>
        <option value="Pelajar/Mahasiswa">Pelajar/Mahasiswa</option>
        <option value="Wiraswasta/Pedagang">Wiraswasta/Pedagang</option>
        <option value="Petani">Petani</option>
        <option value="KaryawanSwasta">Karyawan Swasta</option>
        <option value="lain-lain">Lain-Lain</option>
        {<Lain_Lain />}
      </select>
    </>
  );
}
