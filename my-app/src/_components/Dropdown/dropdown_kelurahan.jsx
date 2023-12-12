import React, { useState, useEffect } from "react";
import { idKec } from "./dropdown_kecamatan";
import axios from "axios";

export let idKelu = "";

export async function getKelurahanData() {
    const apiUrl = process.env.NEXT_PUBLIC_APP_URL_API;
    try {
        let responseKelurahan = await axios.get(
            `${apiUrl}/api/get/kelurahan/${idKec}`,
        );
        return responseKelurahan.data.kelurahan;
    } catch (e) {
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
        setSelectedOption(e.target.value);
        setidKelurahan(e.target.value);
        sendToParent(e.target.value);
    };


    const handleDropdownClick = (e) => {
        try {
            getKelurahanData().then((response) => {
                setKelurahanList(response);
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