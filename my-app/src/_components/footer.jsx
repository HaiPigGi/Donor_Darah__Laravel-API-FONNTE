export default function Footer() {
    return (
      <footer className="bg-red w-full p-4 md:p-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 text-white text-xl">
            <div className="mb-6 md:mb-0">
              <h1 className="font-Title text-2xl md:text-4xl mb-2">Dondar</h1>
              <p>Jl. Paingan maguwoharjo,<br/>depok, sleman, DIY</p>
              <p className="flex my-2 items-center">
                <img src="/img/instagram.png" alt="instagram logo" className="mr-2 w-5 h-5"/>
                @abdisavia_
              </p>
              <p className="flex my-2 items-center">
                <img src="/img/whatsapp.png" alt="whatsapp logo" className="mr-2 w-5 h-5" />
                +62895391616312
              </p>
              <h1 className="text-xl md:text-3xl font-Title">Resource</h1>
            </div>
            <div className="text-right">
              <h1 className="font-Title text-2xl md:text-4xl mb-2">Developers</h1>
              <ul className="text-base md:text-lg">
                <li className="font-Title text-xl md:text-2xl">FrontEnd :</li>
                <li>Jeffan Sulastyo</li>
                <li>Hyeronemus Abdi</li>
              </ul>
              <ul className="text-base md:text-lg">
                <li className="font-Title text-xl md:text-2xl">BackEnd :</li>
                <li>Leonardo Bryan</li>
                <li>Johanes Yogtan</li>
                <li>Cornelius Fransisco</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  