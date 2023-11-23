import "@/_styles/css/login.css";
import Navbar from "@/_components/navbar";

export default function Login() {
  return (
    <main>
      <div className="my-bg">
        <Navbar itemsColor="text-white" />
        <div className="row">
          <div class="rectangle-36">
            <div className="wraper text-center">
              <form className="w-full h-full p-5 relative">
                <h1 className="text-black font-Title text-[40px] w-full block left-0 absolute">LOGIN</h1>
                <div className="flex justify-center items-center  h-full my-auto ">
                  <div className="">
                      <div className="input-container ">
                        <div className="absolute bg-black h-14 w-14 z-0 rounded-e-3xl rounded-s-md flex justify-center items-center">
                          <img
                            className=""
                            src="/img/phone.svg"
                            alt="Icon"
                            height={30}
                            width={30}
                          />
                        </div>
                          <input
                            className="border-2 border-black rounded w-[23rem] h-14 ps-[4rem] text-[25px]"
                            type="text"
                            placeholder="Masukkan No Anda"
                            name="noTelp"
                          />
                      </div>
                      <p className="text-l  text-left mt-2 col-start-1 col-span-3 my-auto mx-auto w-full">Kode OTP dikirim via Whatsapp</p>
                      <div className="absolute right-0 bottom-0 flex items-center justify-end space-x-5 p-5">
                        <a href="/register" className="text-l font-bold text-red border-b border-red">Daftar Akun</a>
                        <button className="font-bold text-l text-white rounded-lg px-3 py-2 h-12 w-40 bg-red">
                          <a href="/OTP">Kirim Kode OTP</a>
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
    </main>
  );
}
