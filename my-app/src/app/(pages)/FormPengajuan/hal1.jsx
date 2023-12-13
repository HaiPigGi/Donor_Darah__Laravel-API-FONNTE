import Dropdown from "@/_components/Dropdown/dropdown";
import React, { useState } from "react";
export default function Hal1({ data, action }) {
    // saving data to object data
    const handleChange = (e) => {
        const { name, value } = e.target;
        action({
            ...data,
            [name]: value,
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="col-span-1 lg:col-span-4">  
                <h1 className="font-bold text-xl text-left">Data Diri</h1>
                <div className="relative font-Subtitle mx-auto mb-2">
                    <div className="absolute bg-black h-14  w-14 z-0 rounded-e-[100px] rounded-s-2xl flex justify-center items-center">
                        <img
                            className=""
                            src="/img/username.svg"
                            alt="Icon"
                            height={25}
                            width={25}
                        />
                    </div>
                    <input
                        className="border border-black rounded-xl w-full h-14 ps-[4rem] text-[20px] block"
                        type="text"
                        placeholder="nama akseptor"
                        name="nama"
                        id="nama"
                        onChange={handleChange}
                    />
                </div>
                <div className="relative font-Subtitle mx-auto mb-2">
                <div className="font-Subtitle mx-auto mt-2">
                    <div className="absolute bg-black h-14  w-14 z-0 rounded-e-[100px] rounded-s-2xl flex justify-center items-center">
                        <img
                            className=""
                            src="/img/username.svg"
                            alt="Icon"
                            height={25}
                            width={25}
                        />
                    </div>
                    <input
                        className="border border-black rounded-xl w-full h-14 ps-[4rem] text-[20px] block"
                        type="text"
                        placeholder="No KTP"
                        name="ktp"
                        id="ktp"
                        onChange={handleChange}
                    />
                </div>
                </div>
                <div className="flex relative font-Subtitle w-full me-2 mt-2">
                    <div className="h-full w-14 bg-black absolute rounded-e-[100px] rounded-s-2xl flex items-center justify-center">
                        <img
                            className="input-icon "
                            src="/img/phone.svg"
                            alt="Icon"
                            height={30}
                            width={30}
                        />
                    </div>
                    <input
                        className="border border-black rounded-xl w-full h-14 ps-[4rem] text-[20px] block"
                        type="text"
                        placeholder="Nomor telpon"
                        name="telepon"
                        id="telepon"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex relative font-Subtitle w-full me-2 mt-2">
                    <div className="h-full w-14 bg-black absolute rounded-e-[100px] rounded-s-2xl flex items-center justify-center">
                        <img
                            className="input-icon "
                            src="/img/marker.svg"
                            alt="Icon"
                            height={30}
                            width={30}
                        />
                    </div>
                    <input
                        className="border border-black rounded-xl w-full h-14 ps-[4rem] text-[20px] block"
                        type="text"
                        placeholder="Alamat"
                        name="alamat"
                        id="alamat"
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full h-auto border-2 border-black rounded-lg mt-2">
                    <div className="p-2 font-Subtitle">
                        <h1 className="text-start font-bold">
                            Alamat Akseptor
                        </h1>
                        <div className=" inline-block font-Subtitle text-[20px] w-full">
                            <Dropdown category="provinsi" />
                            <Dropdown category="kabupaten" />
                            <div className="flex gap-6 justify-center w-full ">
                                <div className="w-1/2">
                                    <Dropdown category="kecamatan" />
                                </div>
                                <div className="w-1/2">
                                    <Dropdown
                                        category="kelurahan"
                                        sendToParent={(value) => {
                                            action({
                                                ...data,
                                                kelurahan_id: value,
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-2 lg:col-span-4 mb-2">
                <h1 className="font-bold text-left text-xl">Kebutuhan Darah</h1>
                <div className="flex items-center border-red gap-2">
                    <div className="w-2/3 font-Subtitle ">
                        <label htmlFor="golongan_darah">Golongan Darah</label>
                        <div className="flex  relative  w-full ">
                            <div className="h-full w-14 bg-black absolute rounded-e-[100px] rounded-s-2xl flex justify-center">
                                <img
                                    className="input-icon "
                                    src="/img/darah.svg"
                                    alt="Icon"
                                    height={25}
                                    width={25}
                                />
                            </div>
                            <div className="w-full">
                                <Dropdown
                                    category="golongan_darah"
                                    sendToParent={(value) => {
                                        action({
                                            ...data,
                                            golongan_darah: value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="font-Subtitle mx-auto">
                        <label htmlFor="jumlah_kantong" className="">Jumlah Katong</label>
                        <div className="font-Subtitle relative  w-[10rem]">
                            <div className="absolute bg-black h-14  w-14 z-0 rounded-e-[100px] rounded-s-2xl flex justify-center items-center">
                                <img
                                    className="text-white"
                                    src="/img/tanganDarah.svg"
                                    alt="Icon"
                                    height={25}
                                    width={25}
                                />
                            </div>
                            <input
                                className="border border-black rounded-xl w-full h-14 ps-[4rem] text-[20px] block"
                                type="number"
                                placeholder="Jumlah kantong"
                                name="jumlah_kantong"
                                id="jumlah_kantong"
                                onChange={handleChange}
                            />
                        </div>
                </div>
                </div>
                <div className="font-Subtitle mt-2">
                    <textarea
                        className="w-full h-[7.4rem] border border-black rounded-md p-2 resize-none"
                        type="text"
                        placeholder="Alasan pengajuan"
                        name="tujuan_Pengajuan"
                        id="tujuan_Pengajuan"
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
}
