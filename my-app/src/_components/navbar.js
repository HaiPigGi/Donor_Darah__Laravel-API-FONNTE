import Link from "next/link";

export default function Navbar(props){
    return(
        <nav className="absolute top-0 w-[100%] z-50">
            <div className="container mx-auto flex py-5 items-center  justify-between">
                <div id="brand">
                    <a href="/" className="text-red text-3xl font-black font-Title">Dondar</a>
                </div>
                <div id="items" className={["font-Subtitle font-regular", props.itemsColor].join(" ")}>
                    <a href="/FormPengajuan" className="px-[15px] py-[15px] relative after:absolute hover:after:border-b-2 after:border-red after:w-full after:h-full after:left-0 after:bottom-0">Kebutuhan</a>
                    <a href="" className="px-[15px] py-[15px] relative after:absolute hover:after:border-b-2 after:border-red after:w-full after:h-full after:left-0 after:bottom-0">Forum</a>
                    <a href="" className="px-[15px] py-[15px] relative after:absolute hover:after:border-b-2 after:border-red after:w-full after:h-full after:left-0 after:bottom-0">Tentang</a>
                    <Link href="/Login"  className="px-[20px] py-2 bg-red text-white font-bold rounded-full">Login</Link>
                </div>
            </div>
        </nav>
    )
}