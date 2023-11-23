import "@/_styles/css/login.css";
import Navbar from "@/_components/navbar";

export default function Verifikasi() {

  return (
    <>
      <div className="my-bg">
        <Navbar itemsColor="text-white" />
        <div className="row">
          <div  className="bg-white bg-no-repeat bg-cover bg-center rounded-lg" style={{ width: "35rem", height: "25rem" }}>
            <div className="wraper text-center">
              <form className="w-full h-full p-5 relative">
                <h1 className="text-black font-Title text-[40px] w-full block left-0 absolute">
                  verifikasi
                </h1>
                <div className="flex justify-center items-center h-full my-auto ">
                  <div className="text-center">
                    <img
                      className="mx-auto mt-8"
                      src="/img/ic_baseline-whatsapp.svg"
                      alt="Icon"
                      height={100}
                      width={100}
                    />
                    <p>Kode OTP dikirim ke nomer :</p>
                    <p className="font-bold">nomer Hp</p>
                    <div>
                      <input
                        type="text"
                        placeholder="Masukan Kode OTP"
                        className="mt-1 p-2 border border-black rounded-md w-80 text-center"/>
                    </div>
                    <p className="mt-3 mb-5">
                      <a href="#" className="border-b border-black">
                        Kirim ulang{" "}</a>{" "}atau{" "}<a href="#" className="border-b border-black">{" "}ganti nomor</a>
                    </p>
                    <div className=""style={{ marginLeft: "23rem" }}>
                        <button
                            type="button"
                            className="border-1 bg-red text-l font-bold p-2 text-white rounded-e-[25px] rounded-s-[5px] flex items-center font-Subtitle">Selanjutnya
                            <img src="/img/ArrowNext.svg" alt="" className="ps-2" />
                        </button>
                    </div>
                    
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* <div class="kotak-baru rounded-full"><p>Nomor anda belum terdaftar di sistem harap daftar terlebih dahulu</p></div> */}
        </div>
      </div>
    </>
  );
}
