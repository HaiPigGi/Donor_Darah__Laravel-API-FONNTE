import Navbar from "@/_components/navbar";
import { useEffect,useState } from "react";
export default function HeroSection(){
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
      // Update window width when the component mounts
      setWindowWidth(window.innerWidth);
  
      // Update window width when the window is resized
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
  
      // Clean up event listener when the component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    return(
        <section className="bg-hero-bg bg-no-repeat bg-cover w-[100%] ">
        <Navbar itemsColor="text-white" />
        <div className="w-full h-screen overflow-hidden relative z-20 backdrop-blur-sm">
          <div className="container mx-auto w-full h-full flex justify-center md:justify-end items-center md:items-center">
            <span className="">
              <h1 className="text-red font-Title text-[35px] md:text-[40px] text-center md:text-right">Setetes darah berguna <br /> untuk mereka</h1>
              <h4 className="text-white font-Title   text-[25px] md:text-[30px] text-center md:text-right font-light">segera donorkan<br /> darah anda</h4>
            </span>
          </div>
        <div className="w-full h-full absolute bottom-0 bg-gradient-to-b to-white from-transparent from-80% z-10 to-100%"></div>
        </div>
      </section>
    )
}