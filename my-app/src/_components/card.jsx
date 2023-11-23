import Image from "next/image";

export default function Card({ alt, width, height, imgPath, desc}){
    function isDescNull(){
        if(desc == ""){
            return(
                <>
                    <Image src={imgPath} alt={alt} width={width} height={height} />
                </>
            )
        }else{
            return(
                <div className=" flex-row">
                    <div className={` h-[20rem] flex items-center`}>
                        <Image src={imgPath} alt={alt} width={width} height={height} className=""/>
                    </div>
                    <div className=" w-full text-center font-Title rounded-xl bg-white h-[70px] flex justify-center items-center ">
                        <h1 className="  my-auto text-2xl text-center w-full">{desc}</h1>
                    </div>
                </div>
                );  
        }
    }
    return(
        <>
        <div className={` border-black px-[2rem] py-[2rem] w-[350px] h-[450px] rounded-xl bg-red hover:cursor-pointer hover:w-[400px]  hover:h-[500px] sha`}>
            <div className={`flex justify-center items-center w-full h-full border-yellow-100`}>
                {isDescNull()}
            </div>
        </div>
        </>
    )
}