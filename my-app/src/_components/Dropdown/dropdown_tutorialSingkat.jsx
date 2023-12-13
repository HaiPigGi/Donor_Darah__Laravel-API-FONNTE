import { useDispatch } from "@/app/(pages)/Dashboard/TutorialSingkatSection";
import { useState } from "react";
import Image from "next/image";

export default function TutorialSingkatDropdown(){
    let selection = ["Pendonor", "Akseptor"];
    const dispatch=useDispatch();
    const[select, setSelect] = useState(selection[0]);
    const[isActive,setIsActive] = useState(false);
    return(
        <>
            <div className="font-Subtitle h-auto">
                <button className="md:text-2xl text-lg w-40 font-bold text-left px-2 rounded-r-full bg-red text-white flex justify-between items-center" onClick={e => {
                    setIsActive(!isActive);
                    setSelect(select);
                }}>
                    {select}
                    <Image src="/img/iconArrowDown.png" width={15} height={15}/>
                </button>
            {isActive && <div className="w-40 border-2 mt-1 rounded-xl absolute bg-white">
                {
                selection.map(select => <button className="block w-full h-full text-left px-2 py-2" onClick={e => {{dispatch({type:select}); setIsActive(false); setSelect(select)}}}>{select}</button>)
                }
            </div>}
            </div>
        </>
    )
}