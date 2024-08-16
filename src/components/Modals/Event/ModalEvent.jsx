import { forwardRef, useContext, useEffect, useState } from "react";
import { ToggleContext } from "../../../hooks/Context";
import axiosInstance from "../../../utils/axiosConfig";
import { ModalTemplate } from "../ModalTemplate";
import { SendHorizonal } from "lucide-react";
import { Input } from "../../Input";

export const ModalEvent = forwardRef((props, ref) => {
  const { setToggleEvent } = useContext(ToggleContext);
  const sessionItem = JSON.parse(sessionStorage.getItem("data"));
  const [data, setData] = useState({
    title: "",
    date: "",
    place: "",
    maps: "",
    time: "",
    agenda: "",
    description: "",
  });

  useEffect(() => {
    const clickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setToggleEvent(false);
      }
    };

    return () => {
      document.addEventListener("mousedown", clickedOutside);
    };
  }, [ref, setToggleEvent]);

  const submitted = async (e) => {
    e.preventDefault();

    data.room_id = sessionItem.room_id;
    data.username = sessionItem.username;
    data.user_id = sessionItem.user_id;

    await axiosInstance
      .post(`/event`, data)
      .then((response) => console.log(response));
  };

  return (
    <ModalTemplate ref={ref} title={"Create Event"}>
      <form className="p-2" onSubmit={submitted} method="POST">
        <section>
          <Input
            title={"Title"}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          <div>Information :</div>
          <Input
            title={"Date"}
            type="date"
            onChange={(e) => setData({ ...data, date: e.target.value })}
          />
          <Input
            title={"Place"}
            onChange={(e) => setData({ ...data, place: e.target.value })}
          />
          <Input
            title={"Map (optional)"}
            onChange={(e) => setData({ ...data, maps: e.target.value })}
          />
          <Input
            title={"Time"}
            type="time"
            onChange={(e) => setData({ ...data, time: e.target.value })}
          />
          <Input
            title={"Agenda"}
            onChange={(e) => setData({ ...data, agenda: e.target.value })}
          />
          <Input title={"Description"}>
            <textarea
              placeholder="Description"
              className="w-full border-b-[1px] bg-slate-800 border-blue-800 p-2 outline-none"
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </Input>
          <div className="flex mt-auto bottom-0">
            <button
              type="submit"
              className="p-2 self-end outline-blue-900 outline outline-1 text-blue-900 hover:bg-blue-900 hover:text-white  rounded-md"
            >
              <SendHorizonal />
            </button>
          </div>
        </section>
      </form>
    </ModalTemplate>
  );
});

ModalEvent.displayName = ModalEvent;
