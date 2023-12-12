import React, { useState } from "react";

export let golongan_darah = "";

export default function DropDownGolonganDarah({sendToParent}) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
    golongan_darah = e.target.value;
    sendToParent(e.target.value); // make sure sendToParent is a function
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
      <option value="A+">A+ (Resus: A+)</option>
      <option value="A-">A- (Resus: A-)</option>
      <option value="B">B</option>
      <option value="B+">B+ (Resus: B+)</option>
      <option value="B-">B- (Resus: B-)</option>
      <option value="AB">AB</option>
      <option value="AB+">AB+ (Resus: AB+)</option>
      <option value="AB-">AB- (Resus: AB-)</option>
      <option value="O">O</option>
      <option value="O+">O+ (Resus: O+)</option>
      <option value="O-">O- (Resus: O-)</option>
    </select>
  );
}
