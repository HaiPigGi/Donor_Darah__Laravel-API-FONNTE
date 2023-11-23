

export default function Footer(){
    return(
        <footer className="bg-red w-full h-auto p-10 pt-10">
            <div className="container p-10 px-10 mx-auto">
                <div className="grid grid-cols-2 text-white text-xl ">
                    <div>
                        <h1 className="font-Title text-4xl">Dondar</h1>
                        <p>Jl. Paingan maguwoharjo,<br/>depok, sleman, DIY</p>
                        <p className="flex my-2 items-center">
                            <img src="/img/instagram.png" alt="instagram logo" className="mr-2 w-5 h-5"/>
                            @abdisavia_
                        </p>
                        <p className="flex my-2 items-center">
                            <img src="/img/whatsapp.png" alt="whatsapp logo" className="mr-2 w-5 h-5" />
                            +62895391616312
                        </p>
                        <h1 className="text-3xl font-Title">Resource</h1>
                    </div>
                    <div className="text-right">
                        <h1 className="font-Title text-4xl">Developers</h1>
                        <ul className="text-[20px]">
                            <li className="font-Title text-3xl">FrontEnd :</li>
                            <li>Jeffan Sulastyo</li>
                            <li>Hyeronemus Abdi</li>
                        </ul>
                        <ul className="text-[20px]">
                            <li className="font-Title text-3xl">BackEnd :</li>
                            <li>Leonardo Bryan</li>
                            <li>Johanes Yogtan</li>
                            <li>Cornelius Fransisco</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}