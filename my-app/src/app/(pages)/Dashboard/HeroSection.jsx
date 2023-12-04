import Navbar from "@/_components/navbar";

export default function HeroSection(){
    return(
        <section className="bg-hero-bg bg-no-repeat bg-cover w-[100%] border border-black ">
            
            <Navbar itemsColor="text-white"/>
            <div className="w-full h-screen overflow-hidden relative z-20 backdrop-blur-sm">
            <div className="container mx-auto w-full h-full flex justify-center md:justify-end items-center  md:items-center">
                <span className="">
                <h1 className="text-red font-Title text-[35px] md:text-[40px] text-center md:text-right">Setetes darah berguna <br/> untuk mereka</h1>
                <h4 className="text-white font-Title text-[25px] md:text-[30px] text-center md:text-right font-light">segera donorkan<br/> darah anda</h4>
                </span>
            </div>
            </div>
            <div className="w-full h-full absolute top-0 bg-gradient-to-b to-white from-transparent from-80% z-10 to-100%"></div>
        </section>
    )
}