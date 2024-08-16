import { useEffect, useState } from "react";
import { FaLaravel, FaReact } from "react-icons/fa";
import axiosInstance from "../utils/axiosConfig";
import { LoaderCircle } from "lucide-react";

// eslint-disable-next-line react/prop-types
export default function Auth({ children, title }) {
  const [isTokenReady, setIsTokenReady] = useState(false);

  // const fetchData = async () => {
  //   try {
  //     await axiosInstance.get("/sanctum/csrf-cookie");
  //     setIsTokenReady(true);
  //   } catch (error) {
  //     console.error("Failed to fetch CSRF token:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // if (!isTokenReady) {
  //   return (
  //     <div className="h-screen flex justify-center items-center bg-slate-900">
  //       <LoaderCircle className="animate-spin text-blue-400" size={100} />
  //     </div>
  //   );
  // }

  return (
    <main className=" h-screen w-screen flex">
      <div className="bg-slate-800 shadow-indigo-600/50 w-1/2  h-screen flex  flex-col items-center  justify-center gap-8 shadow-xl ">
        <div className="font-bold text-xl grid grid-rows-2 place-items-center">
          <span className="uppercase font-black text-white">{title}</span>
        </div>
        {children}
      </div>
      <div className="flex items-center justify-center bg-mainbg bg-opacity-0 bg-center  w-1/2">
        <img src="/pic/Realestlogo.svg" alt="" />
      </div>
    </main>
  );
}
