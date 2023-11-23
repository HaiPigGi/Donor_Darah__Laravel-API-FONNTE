import Dropdown from "@/_components/Dropdown/dropdown";

export default function Hal1(){
    return(
        <div>
                <div className=" font-Subtitle mx-auto  h-full mb-2">
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
                                className="border border-black rounded-xl w-[750px] h-14 ps-[4rem] text-[20px] block"
                                type="text"
                                placeholder="nama akseptor"
                                name="noTelp"
                            />                        
                    </div>
                    <div className="flex justify-center items-center border-black w-full">
                        <div className="flex relative font-Subtitle h-full  me-2">
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
                                className="border border-black rounded-xl w-[250px] h-14 ps-[4rem] text-[20px]"
                                type="text"
                                placeholder="Nomor telpon"
                                name="noTelp"
                            />
                        </div>
                        <div className=" relative font-Subtitle me-2 ">
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
                                    className="border border-black rounded-xl w-[250px] h-14 ps-[4rem] text-[20px] pe-2"
                                    type="date"
                                    placeholder="tanggal lahir"
                                    name="noTelp"
                                />
                        </div>
                        <div className="flex  relative font-Subtitle w-[14rem]">
                            <div className="h-full w-14 bg-black absolute rounded-e-[100px] rounded-s-2xl flex justify-center">
                                <img
                                    className="input-icon "
                                    src="/img/darah.svg"
                                    alt="Icon"
                                    height={25}
                                    width={25}
                                /> 
                            </div>
                            <div className="w-">
                              <Dropdown category="golongan_darah"/>
                            </div>
                        </div>                                                
                    </div>
                    <div className="w-[750px] h-auto border-2 border-black rounded-lg mt-2">
                      <div className="p-2 font-Subtitle">
                        <h1 className="text-start font-bold">Alamat</h1>
                          <div className=" inline-block font-Subtitle text-[20px] w-full">
                              <Dropdown category="provinsi" action/>
                              <Dropdown category="kabupaten"/>
                              <div className="flex gap-6 justify-center w-full ">
                                <div className="w-1/2">
                                  <Dropdown category="kelurahan"/>

                                </div>
                                <div className="w-1/2">
                                  <Dropdown category="kecamatan"/>
                                </div>
                              </div>
                          </div>
                      </div>
                </div>
        </div>
    );
}