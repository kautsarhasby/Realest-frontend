/* eslint-disable react/prop-types */
import { Ellipsis } from "lucide-react";
import { useContext, useState } from "react";
import ReactPlayer from "react-player";
import { InformationContext, ToggleContext } from "../hooks/Context";

export const Information = ({
  id,
  author,
  date,
  description,
  title,
  link,
  data,
}) => {
  const { setDeleteInformation, setEditInformation } =
    useContext(InformationContext);
  const { setToggleDeleteInfo, setToggleEditInfo } = useContext(ToggleContext);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main className="bg-slate-800 w-1/2 p-4  h-auto rounded-md shadow-md shadow-blue-300">
      <div className="text-3xl font-bold border-b-[1px] my-2  flex justify-between relative">
        <div>
          <section>{title}</section>
          <section className="text-base text-slate-500">
            <span>{author}</span> | <span>{date}</span>
          </section>
        </div>
        <button>
          <Ellipsis size={30} onClick={() => setIsOpen(!isOpen)} />
        </button>
        <div
          className={`absolute bg-slate-800 shadow-md shadow-black rounded-md w-32 transition-all ${
            isOpen ? "scale-100 right-8" : "scale-0 right-0"
          }`}
        >
          <section className="text-xl font-normal flex flex-col ">
            <button
              className="hover:bg-slate-600 rounded-t-md"
              onClick={() => {
                setEditInformation(data);
                setToggleEditInfo((prev) => !prev);
              }}
            >
              Edit
            </button>
            <button
              className="hover:bg-slate-600 rounded-b-md"
              onClick={() => {
                setDeleteInformation(id);
                setToggleDeleteInfo((prev) => !prev);
              }}
            >
              Delete
            </button>
          </section>
        </div>
      </div>
      <div>
        <article>{description}</article>
      </div>
      <div className="flex justify-center">
        <ReactPlayer url={link} />
      </div>
    </main>
  );
};
