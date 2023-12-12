import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { idProv } from "./dropdown_provinsi";

export let idKab = "";

const getKabupatenData = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_APP_URL_API;
  let idProvince = idProv
  try{
    let kabResponse = axios.get(`${apiUrl}/api/get/kabupaten/${idProvince}`)
    return (await kabResponse).data.kabupaten

  }catch(e){
    console.log(e.message);
    alert("Harap Masukkan data provinsi terlebih dahulu");
  }
}

function setidKabupaten(id){
  idKab = id
}

export function getidKabupaten(){
  return dataLokasi
}


export default function DropDownKabupaten() {
  const [selectedOption, setSelectedOption] = useState("Kabupaten");
  const [kabupatenList, setKabupatenList] = useState([]);
  
  const handleDropdownChange = (e) => {
    setidKabupaten(e.target.value);
    setSelectedOption(e.target.value);
  };
    
  const hanldeDropdownClick = () => {
    try{
      getKabupatenData()
        .then(response => {
            setKabupatenList(response)
          }
        )
    }catch(e){
      // alert("");
    }
  }

  const RenderKabupatenData =()=>{
    try{
      return kabupatenList.map((kabupaten) => (
        <option key={kabupaten.id} value={kabupaten.id}>
          {kabupaten.nama}
        </option>
      ))
    }catch(e){

    }
  }


  return (
      <select className="h-[50px] w-full border-2 border-stone-950 text-left rounded-md block mb-3"
        id="pilihan"
        name="pilihan"
        value={selectedOption}
        onChange={handleDropdownChange}
        onClick={hanldeDropdownClick}
      >
        <option value="">Kabupaten</option>
        <RenderKabupatenData/>
      </select>
  );
};

