"use client";
import TutorialSingkatDropdown from "./dropdown_tutorialSingkat";
import DropDownProvinsi from "./dropdown_provinsi";
import DropDownKabupaten from "./dropdown_kabupaten";
import DropDownKelurahan from "./dropdown_kelurahan";
import DropDownKecamatan from "./dropdown_kecamatan";
import DropDownGolonganDarah from "./golongan_darah";
import Pekerjaan from "./dropdown_pekerjaan";

function Dropdowns({category,action}) {
    if(category == "tutorialSingkat"){
        return <TutorialSingkatDropdown selection={selection}/>
    }else if(category == "provinsi"){
       return <DropDownProvinsi action={action}/>
    }else if(category == "kabupaten"){
        console.log("Kabupaten Added")
       return <DropDownKabupaten/>
    }else if(category == "kecamatan"){
       return <DropDownKecamatan/>
    }else if(category == "kelurahan"){
       return <DropDownKelurahan/>
    }else if(category == "golongan_darah"){
       return <DropDownGolonganDarah />
    }else if(category == "pekerjaan"){
        return <Pekerjaan/>
    }else{
        return "none"
    }
}

export default function Dropdown({category, selection}){
    

    return(
        <Dropdowns category={category}/>
    )
}