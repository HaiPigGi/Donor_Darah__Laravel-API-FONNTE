import Map from "@/_components/Map";

export default function InformasiPendonorSection(){
    return(
      <section className="w-full h-screen flex items-center">
        <div className="md:container mx-auto">
          <h1 className="text-center font-Title text-3xl my-5">Informasi Pendonor</h1>
          <div className="w-full h-[35rem] p-5 bg-red rounded-3xl"> 
            <Map/>
          </div>
        </div>
      </section>
    )
  }