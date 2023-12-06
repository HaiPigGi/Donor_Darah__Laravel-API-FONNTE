import React, { useState, useEffect } from "react";
import { idKec } from "./dropdown_kecamatan";
import axios from "axios";

export let idKelu = "";

export async function getKelurahanData() {
    try {
        let responseKelurahan = await axios.get(
            `http://localhost:8000/api/get/kelurahan/${idKec}`
        );
        return responseKelurahan.data.kelurahan;
    } catch (e) {
        console.log(e.message);
        alert(e.message);
    }
}

function setidKelurahan(id) {
    idKelu = id;
}

export default function DropDownKelurahan({ sendToParent }) {
    const [selectedOption, setSelectedOption] = useState("");
    const [kelurahanList, setKelurahanList] = useState([]);

    const handleDropdownChange = (e) => {
        const selectedKelurahanId = e.target.value;
        setSelectedOption(selectedKelurahanId);

        // Store the selected Kelurahan ID in sessionStorage
        sessionStorage.setItem("kelurahan_id", selectedKelurahanId);
        const getKelurahanID = sessionStorage.getItem("kelurahan_id");
        console.log("Kelurahan Id dari session : ", getKelurahanID);
    };

    const handleDropdownClick = (e) => {
        try {
            getKelurahanData().then((response) => {
                setidKelurahan(e.target.value);
                setKelurahanList(response);
                console.log("kelurahan id : ", response);
                sendToParent(e.target.value);
            });
        } catch (e) {}
    };

    const RenderDropdownData = () => {
        try {
            return kelurahanList.map((kelurahan) => (
                <option key={kelurahan.id} value={kelurahan.id}>
                    {kelurahan.nama}
                </option>
            ));
        } catch (e) {}
    };

    return (
        <select
            className="h-[50px] w-full  border-2 border-stone-950 text-left rounded-md flex mb-3"
            id="pilihan"
            name="kelurahan_id"
            value={selectedOption}
            onChange={handleDropdownChange}
            onClick={handleDropdownClick}
        >
            <option value="">Kelurahan</option>
            <RenderDropdownData />
        </select>
    );
}
