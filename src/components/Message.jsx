import { ChevronDown, LoaderCircle } from "lucide-react";
import Popup from "./Popup";
import { useContext, useEffect, useRef, useState } from "react";
import { MessageContext } from "../hooks/Context";
// eslint-disable-next-line react/prop-types
const Message = ({ user }) => {
  const { messageText, loading } = useContext(MessageContext);
  const [hoverIndex, setHoverIndex] = useState([]);
  const [clickedOpen, setClickedOpen] = useState([]);
  const messageRef = useRef();
  messageText.sort((a, b) => a.id - b.id);

  useEffect(() => {
    if (messageText.length > 0) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageText]);

  return (
    <section
      id="card"
      className=" flex flex-col sm:justify-center w-[90%] self-center pl-72 py-6 my-24 sm:pt-0"
    >
      <div className="w-full h-full items-center flex flex-col">
        {loading ? (
          <div className="min-h-[70vh] flex items-center justify-center">
            <LoaderCircle className="animate-spin" />
          </div>
        ) : (
          messageText.map((data, index) => {
            const isHover = hoverIndex.includes(index);
            const isClicked = clickedOpen.includes(index);
            const isLastMessage = index === messageText.length - 1;
            return (
              <div
                key={index}
                className={`flex items-center w-1/2 h-auto gap-4 ${
                  user == data.username ? "self-end" : "self-start"
                }`}
                id={`message-${data.id}`}
                ref={isLastMessage ? messageRef : null}
              >
                <div className="flex justify-center">
                  {user == data.username ? (
                    ""
                  ) : (
                    <img
                      src="/pic/honkai.jpg"
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  )}
                </div>
                <div
                  className={`w-full flex flex-col  mt-6 px-6 py-4 shadow-md  ${
                    user == data.username
                      ? "rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl bg-blue-200"
                      : "rounded-tr-2xl rounded-tl-2xl rounded-br-2xl bg-white"
                  } `}
                  onMouseEnter={() => setHoverIndex((prev) => [...prev, index])}
                  onMouseLeave={() => {
                    isClicked
                      ? setHoverIndex((prev) => [...prev, index])
                      : setHoverIndex((prev) =>
                          prev.filter((i) => i !== index)
                        );
                  }}
                >
                  <div className="relative flex flex-col">
                    {user == data.username && isHover && (
                      <span
                        className="absolute right-0 cursor-pointer"
                        onClick={() =>
                          setClickedOpen((prev) =>
                            prev.includes(index)
                              ? prev.filter((i) => i !== index)
                              : [index]
                          )
                        }
                      >
                        <ChevronDown />
                      </span>
                    )}
                    {isClicked && <Popup data={data} />}
                    <span className="font-bold">
                      {" "}
                      {user == data.username ? "You" : data.username}
                    </span>
                    <h1>{data.message}</h1>

                    <span className="text-slate-400">
                      {data.edited == 1 ? "Edited" : ""}
                    </span>
                    <span className="font-light self-end">
                      {" "}
                      {data.created_at}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default Message;
