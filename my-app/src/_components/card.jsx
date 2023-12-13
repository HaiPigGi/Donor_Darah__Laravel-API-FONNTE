import Image from "next/image";

export default function Card({ alt, imgPath, desc, width = 200, height = 100 }) {
    function isDescNull() {
        if (desc === "") {
            return (
                <div className="relative h-full ">
                    <Image
                        src={imgPath}
                        alt={alt}
                        layout="fill"
                        objectFit="contain" // Menggunakan objectFit "contain" untuk memastikan gambar tidak melebihi
                    />
                </div>
            );
        } else {
            return (
                <div className="flex flex-col">
                    <div className=" h-[20rem]  flex">
                        <Image
                            src={imgPath}
                            alt={alt}
                            width={width}
                            height={height}
                            className="object-cover self-center"
                        />
                    </div>
                    <div className="w-full text-center font-Title rounded-xl bg-white mt-2 p-2">
                        <h1 className="text-2xl text-center">
                            {desc}
                        </h1>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className="border-black p-4 w-[350px] h-[450px] rounded-xl bg-red md:hover:cursor-pointer md:hover:w-[400px] md:hover:h-[500px] ">
            <div className="flex justify-center items-center w-full h-full border-yellow-100">
                {isDescNull()}
            </div>
        </div>
    );
}
