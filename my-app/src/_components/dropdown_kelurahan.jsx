import React, { useState, useEffect } from "react";
import axios from "axios";


export default function DropDown() {
  const [selectedOption, setSelectedOption] = useState("");
  const [kelurahanList, setKelurahanList] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_APP_URL_API;
  
  const getData = async () => {
    try{
      const response = axios.get(`${apiUrl}/api/get/provinsi`);
      console.log(response.data);
    }catch(e){
      console.log("Error: ", e)
    }
  }
  useEffect(() => {
    // Mengambil data kelurahan dari API
    getData()
  }, []);

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const dropdownStyle = {
    height: "40px", 
    width: "150px",
    position: "relative",
    top: "-70px",
    left: "12.5vh"   
  };

  return (
    <section>
      <select className="dropdown border-2 border-stone-950 text-left rounded-md"
      style={dropdownStyle} 
        id="pilihan"
        name="pilihan"
        value={selectedOption}
        onChange={handleDropdownChange}
      >
        <option value="">Kelurahan</option>
        {kelurahanList.map((kelurahan) => (
          <option key={kelurahan.id} value={kelurahan.nama}>
            {kelurahan.nama}
          </option>
        ))}
      </select>
    </section>
  );
}
