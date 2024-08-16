import { useContext, useEffect, useRef, useState } from "react";
import Message from "../components/Message";
import { ImagePlus, SendHorizonal, Sticker } from "lucide-react";
import axiosInstance from "../utils/axiosConfig";
import { ToggleContext } from "../hooks/Context";

export default function Chat() {
  const { setToggleMessage } = useContext(ToggleContext);
  const [message, setMessage] = useState("");
  const messageRef = useRef();
  const { username, room_id } = JSON.parse(sessionStorage.getItem("data"));

  const submitForm = async (e) => {
    e.preventDefault();
    const data = { username: username, room_id: room_id, message: message };
    await axiosInstance.post(`/message/${room_id}`, data).then((response) => {
      if (response.status == 200) {
        setMessage("");
        setToggleMessage(false);
      }
    });
  };

  useEffect(() => {
    messageRef.current.focus();
  }, []);

  return (
    <>
      <aside className="w-[10%] lg:w-[5%] bg-slate-800 h-1/2 my-48 justify-self-center fixed rounded-r-xl  ">
        <div className="flex flex-col items-center justify-center h-full relative">
          <section className="text-white hover:bg-slate-700 p-2 hover:rounded-full cursor-pointer">
            <ImagePlus size={25} />
          </section>
          <section className="text-white hover:bg-slate-700 p-2 hover:rounded-full cursor-pointer">
            <Sticker size={25} />
          </section>
          <section className="bg-white absolute left-20"></section>
        </div>
      </aside>
      <main className="font-sans text-gray-900 antialiased flex flex-col  w-full">
        <Message user={username} />
        <section className="w-full bottom-0 fixed  px-6 py-4 bg-slate-800 shadow-md overflow-hidden ">
          <form
            id="form"
            onSubmit={submitForm}
            className="flex items-center w-full"
          >
            <input
              type="text"
              name="message"
              placeholder="Message"
              id="input-data"
              ref={messageRef}
              className="w-full rounded-md py-2.5 px-4 border text-sm bg-slate-800 text-white outline-slate-300 focus:ring-2 focus:ring-blue-400 focus:outline-blue-400 h"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              onKeyDown={(e) => e.key === "Enter" && submitForm}
              autoComplete="off"
            />

            <button
              id="submit"
              type="submit"
              className="ms-4   py-2.5 px-4 bg-slate-800 border border-transparent rounded-md font-semibold text-xs text-white  hover:bg-white hover:text-slate-800 focus:bg-gray-700 active:bg-gray-900 transition ease-in-out duration-150"
            >
              <SendHorizonal />
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
