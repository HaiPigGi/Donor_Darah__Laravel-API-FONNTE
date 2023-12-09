"use client";
import TutorialSingkatDropdown from "./dropdown_tutorialSingkat";
import DropDownProvinsi from "./dropdown_provinsi";
import DropDownKabupaten from "./dropdown_kabupaten";
import DropDownKelurahan from "./dropdown_kelurahan";
import DropDownKecamatan from "./dropdown_kecamatan";
import DropDownGolonganDarah from "./golongan_darah";
import Pekerjaan from "./dropdown_pekerjaan";

function Dropdowns({ category, action }) {
    console.log("action : " + action);
    if (category == "tutorialSingkat") {
        return <TutorialSingkatDropdown selection={selection} />;
    } else if (category == "provinsi") {
        return <DropDownProvinsi />;
    } else if (category == "kabupaten") {
        console.log("Kabupaten Added");
        return <DropDownKabupaten />;
    } else if (category == "kecamatan") {
        return <DropDownKecamatan />;
    } else if (category == "kelurahan") {
        return <DropDownKelurahan sendToParent={action} />;
    } else if (category == "golongan_darah") {
        return <DropDownGolonganDarah sendToParent={action} />;
    } else if (category == "pekerjaan") {
        return <Pekerjaan sendToParent={action} />;
    } else {
        return "none";
    }
}

export default function Dropdown({ category, sendToParent }) {
    console.log("sendToParent DD: " + sendToParent);
    return <Dropdowns category={category} action={sendToParent} />;
}
