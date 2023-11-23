import Dropdown from "@/_components/Dropdown/dropdown";

export default function Hal2(){
    return(
            <div className=" w-[750px] mb-[15vh] relative">
                <div className=" h-16 block py-5">
                    <label htmlFor="alamatRumahSakit" className="text-left w-full block">Alamat Rumah Sakit : </label>
                    <input className="w-full h-10 border-black border-2 rounded-md ps-2" name="alamatRumahSakit" placeholder="masukkan alamat"/>
                </div>
                <div className="block mt-10">
                    <label className="block mb-2 text-md font-medium text-gray-900 w-full text-left" htmlFor="large_size">Upload Surat Rekomendasi</label>
                    <input className="block w-full h-24 text-xl text-gray-900 border border-gray-300 cursor-pointer bg-gray-50  focus:outline-none " id="large_size" type="file"></input>
                </div>
            </div>

    );
}