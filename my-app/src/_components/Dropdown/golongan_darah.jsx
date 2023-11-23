import React, { useState } from "react";

export let golongan_darah = "";

export default function DropDownGolonganDarah() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
    golongan_darah = e.target.value;

    // Store the selected golongan darah in session storage
    sessionStorage.setItem("golongan_darah", golongan_darah);
  };

  return (
    <select
      className="border-2 border-stone-950 text-left rounded-md text-[20px] ps-[4rem] w-full h-14"
      id="pilihan"
      name="golongan_darah"
      value={selectedOption}
      onChange={handleDropdownChange}
    >
      <option value="" className="">
        Golongan Darah
      </option>
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="O">O</option>
    </select>
  );
}
