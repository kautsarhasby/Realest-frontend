import { Pen } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { InformationContext, ToggleContext } from "../hooks/Context";
import { Information } from "../components/Information";

export default function Learning() {
  const { setToggleInformation } = useContext(ToggleContext);
  const { informations } = useContext(InformationContext);

  return (
    <main className="text-white flex items-center flex-col justify-center ">
      <div
        className="fixed flex items-center justify-center m-4 right-0 bottom-0 w-24 h-24  rounded-full bg-blue-400 shadow-md cursor-pointer hover:bg-blue-600 active:bg-blue-200 active:text-black z-10"
        onClick={() => setToggleInformation((prev) => !prev)}
      >
        <Pen size={30} className=" text-white" />
      </div>
      <div className=" w-full flex flex-col items-center justify-center my-24 gap-8">
        {informations.map((information, index) => {
          return (
            <Information
              key={index}
              id={information.id}
              title={information.title}
              link={information.link}
              description={information.description}
              date={information.created_at}
              author={information.author}
              data={information}
            />
          );
        })}
      </div>
    </main>
  );
}
