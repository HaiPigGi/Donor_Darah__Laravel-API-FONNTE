import React, { useState, useEffect } from "react";
import { idKab } from "./dropdown_kabupaten";
import axios from "axios";

export let idKec = ""

async function getKecamatanData() {
  let idKabupaten = idKab
  const apiUrl = process.env.NEXT_PUBLIC_APP_URL_API;
  try{
    let kecamatanResponse = await axios.get(`${apiUrl}/api/get/kecamatan/${idKabupaten}`)
    return kecamatanResponse.data.kecamatan 
  }catch(e){
    if(idKabupaten == undefined){
      alert("Harap Pilih Kabupaten dlu");
    }else{
      console.log(idKabupaten)
      alert(e.message);
    }
  }
}

 function setIdKecamatan(id){
  idKec = id
}

export default function DropDownKecamatan() {
  const [selectedOption, setSelectedOption] = useState("");
  const [kecamatanList, setKecamatanList] = useState([]);

  const handleDropdownChange = (e) => {
    setIdKecamatan(e.target.value);
    setSelectedOption(e.target.value);
  };

  const handleDropdownClick = () => {
    try{
      getKecamatanData()
      .then(response => { 
          setKecamatanList(response);
      })
    }catch(e){}
  }

  const RenderDataKecamatan = () => {
    try{
      return kecamatanList.map((kecamatan) => (
        <option key={kecamatan.id} value={kecamatan.id}>
          {kecamatan.nama}
        </option>
      ))
    }catch(e){}
  }

  return (
      <select className="h-[50px] w-full  border-2 border-stone-950 text-left rounded-md flex mb-3"
      
        id="pilihan"
        name="pilihan"
        value={selectedOption}
        onChange={handleDropdownChange}
        onClick = {handleDropdownClick}
      >
        <option value="">kecamatan</option>
        <RenderDataKecamatan/>
      </select>
  );
}
