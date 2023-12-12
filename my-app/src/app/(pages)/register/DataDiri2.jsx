import { useState, Suspense } from "react";
import ErrorMessage from "@/_components/errorMessage";
import Pekerjaan from "@/_components/Dropdown/dropdown_pekerjaan";
import Darah from "@/_components/Dropdown/golongan_darah";
import Dropdown from "@/_components/Dropdown/dropdown";

export default function DataDiri2({ data, action }) {
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <div id="contentRegister" className="mx-auto flex justify-center pt-10">
            <div className="">
                <div className="input-container mb-1 font-Subtitle border-2">
                    <div className="absolute bg-black h-14 w-14 z-0 rounded-e-[100px] rounded-s-2xl flex justify-center items-center">
                        <img
                            className=""
                            src="/img/Vector.svg"
                            alt="Icon"
                            height={25}
                            width={25}
                        />
                    </div>
                    <Dropdown
                        category="pekerjaan"
                        sendToParent={(value) => {
                            action({
                                ...data,
                                pekerjaan: value,
                            });
                        }}
                    />
                </div>
                <div className="input-container mb-4 relative font-Subtitle">
                    <div className="h-full w-14 bg-black absolute rounded-e-[100px] rounded-s-2xl flex items-center justify-center">
                        <img
                            className="input-icon "
                            src="/img/darah.svg"
                            alt="Icon"
                            height={30}
                            width={30}
                        />
                    </div>
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
                <Suspense fallback={<h1>Loading...</h1>}></Suspense>
                <div className="flex justify-start items-center mt-2">
                    <p className="tulisan text-l">Harap di isi dengan benar</p>
                </div>
                {errorMessage}
            </div>
        </div>
    );
}
