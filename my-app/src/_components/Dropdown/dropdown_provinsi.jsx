import React, { useState, useEffect } from "react";
import axios from "axios";

export let idProv = "";

export async function getProvinsiData(){
  try{
    var response = await axios.get(`${apiUrl}/api/get/provinsi`)
    return  response.data.provinsi;
  }catch(e){
    console.log("Error at Provinsi DD : "+e.message);
  }
}

export function setidProv(id){
  idProv = id
}

export default function DropDownProvinsi(action) {
  const [selectedOption, setSelectedOption] = useState("");
  const [ProvinsiList, setProvinsiList] = useState([]);
  
  useEffect( () => {
    try{
      let provinsiData = getProvinsiData()
      provinsiData
      .then(result => {
          setProvinsiList(result)
        }
      ).catch(error => {
          // alert(error.message)
        }
      )

    }catch(e){
      console.log("error at UseEffect DDProv : "+e.message)
    }
  }, []);
  const handleDropdownChange = (e) => {
    console.log("Selected value:", e.target.value);
    setidProv(e.target.value);
    setSelectedOption(e.target.value);
  };
  

  const RenderDataProvince = () => {
    try{
      return ProvinsiList.map((provinsi) => (
        <option value={provinsi.id} >
          {provinsi.nama}
        </option>
      ))
    }catch(e){

    }
  }

  return (
      <select className="h-[50px] w-full border-2 border-stone-950 rounded-md block mb-3"
        value={selectedOption}
        onChange={handleDropdownChange}
      >
        <option value="" >Provinsi</option>
        <RenderDataProvince/>
      </select>
  );
}
