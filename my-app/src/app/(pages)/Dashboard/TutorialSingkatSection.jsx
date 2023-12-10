"use client";
import { useReducer, createContext, useContext } from "react";
import Card from "@/_components/card";
import TutorialSingkatDropdown from "@/_components/Dropdown/dropdown_tutorialSingkat";

const roleContext = createContext(null);
const roleDispatchContext = createContext(null);

export function useDispatch() {
  return useContext(roleDispatchContext);
}

export default function TutorialSingkatSection() {
  const [category, dispatch] = useReducer(
    categoryReducer,
    { kategori: "Pendonor" }
  );

  function categoryReducer(category, action) {
    if (action.type === "Pendonor") {
      return { kategori: "Pendonor" };
    } else {
      return { kategori: "Akseptor" };
    }
  }

  return (
    <section className="w-full min-h-screen flex items-center overflow-hidden">
      <div className="md:container mx-auto my-auto">
        <roleContext.Provider value={category}>
          <roleDispatchContext.Provider value={dispatch}>
            <div className="flex flex-col md:flex-row md:items-center mb-14">
              <h1 className="text-xl mb-4 md:mb-0 md:mr-2">
                Cara menjadi
              </h1>
              <TutorialSingkatDropdown />
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center md:h-[30rem]">
              {category.kategori === "Pendonor" ? (
                <>
                  <Card
                    width={600}
                    height={15}
                    desc="Registrasi"
                    imgPath="/img/Asset 18.png"
                    alt="Registrasi"
                  />
                  <Card
                    width={600}
                    height={15}
                    desc="Tunggu"
                    imgPath="/img/email.png"
                    alt="Tunggu"
                  />
                  <Card
                    width={600}
                    height={15}
                    desc="Terima Broadcast"
                    imgPath="/img/Frame3.png"
                    alt="Terima Broadcast"
                  />
                </>
              ) : (
                <Card
                  width={600}
                  height={15}
                  desc="Isi Form"
                  imgPath="/img/Asset 18.png"
                  alt="Registrasi 1"
                />
              )}
            </div>
          </roleDispatchContext.Provider>
        </roleContext.Provider>
      </div>
    </section>
  );
}
