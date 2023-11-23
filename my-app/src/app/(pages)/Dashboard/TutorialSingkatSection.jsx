"use client";
import {useReducer,createContext,useContext} from "react";
import Card from "@/_components/card";
import TutorialSingkatDropdown from "@/_components/Dropdown/dropdown_tutorialSingkat";
const roleContext = createContext(null);
const roleDispatchContext = createContext(null);


export function useDispatch(){
  return useContext(roleDispatchContext);
}


export default function TutorialSingkatSection() {
    const [category, dispatch] = useReducer(
        categoryReducer,
        {kategori:"Pendonor"}
      );
    
      function categoryReducer(category,action){
        if (action.type == "Pendonor"){
          return {kategori: "Pendonor"};
        }else{
          return {kategori: "Akseptor"};
        }

      }
      return(
        <section className="w-full h-screen flex items-center">
            <div className="container mx-auto my-auto">
              <roleContext.Provider value={category}>
                <roleDispatchContext.Provider value={dispatch}>
                  <div className="flex items-center mb-14">
                    <h1 className="pe-2 text-xl">Cara menjadi</h1>
                    <TutorialSingkatDropdown/> 
                  </div>
                  {
                    category.kategori == "Pendonor" ?
                    <div className="flex flex-row justify-center gap-8 items-center h-[30rem] ">
                      <Card width={600} height={15} desc="Registrasi" imgPath="/img/Asset 18.png" alt="Registrasi"/>
                      <Card width={600} height={15} desc="Tunggu" imgPath="/img/email.png" alt="Tunggu"/>
                      <Card width={600} height={15} desc="Terima Broadcast" imgPath="/img/Frame3.png" alt="Terima Broadcast"/> 
                    </div> : 
                    <div className="flex flex-row justify-center gap-8 items-center h-[30rem]">
                      <Card width={600} height={15} desc="Registrasi1" imgPath="/img/Asset 18.png" alt="Registrasi 1"/>
                      <Card width={600} height={15} desc="Tunggu1" imgPath="/img/email.png" alt="Tunggu 1"/>
                      <Card width={600} height={15} desc="Terima Broadcast1" imgPath="/img/Frame3.png" alt="Terima Broadcast 1"/> 
                    </div>
                  }
                </roleDispatchContext.Provider>
              </roleContext.Provider>
            </div>
          </section>
      )
}
