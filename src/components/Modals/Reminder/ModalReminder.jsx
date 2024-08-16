/* eslint-disable react/prop-types */
import { SendHorizonal } from "lucide-react";
import { forwardRef, useContext, useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosConfig";
import { Input } from "../../Input";
import { ModalTemplate } from "../ModalTemplate";
import { ToggleContext } from "../../../hooks/Context";

export const ModalReminder = forwardRef((props, ref) => {
  const [message, setMessage] = useState("");
  const { setToggleReminder } = useContext(ToggleContext);
  const sessionItem = JSON.parse(sessionStorage.getItem("data"));
  const [data, setData] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
  });

  useEffect(() => {
    const clickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setToggleReminder(false);
      }
    };
    document.addEventListener("mousedown", clickedOutside);

    return () => {
      document.removeEventListener("mousedown", clickedOutside);
    };
  }, [ref, setToggleReminder]);

  const submitted = async (e) => {
    e.preventDefault();

    data.room_id = sessionItem.room_id;
    data.username = sessionItem.username;
    data.user_id = sessionItem.user_id;

    await axiosInstance.post("/reminder", data).then((response) => {
      {
        console.log(response);
        setToggleReminder(false);
      }
    });
  };

  const notifier = (e) => {
    Notification.requestPermission().then((perm) => {
      if (perm === "granted") {
        setTimeout(() => {
          const notif = new Notification("amboy");
        }, [5000]);
      } else {
        e.target.checked = false;
        setMessage("Unblock the notification to use the feature");
      }
    });
  };

  return (
    <ModalTemplate ref={ref} title={"Create Reminder"}>
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
            title={"Time"}
            type="time"
            onChange={(e) => setData({ ...data, time: e.target.value })}
          />
          <Input title={"Description"}>
            <textarea
              placeholder="Description"
              className="w-full border-b-[1px] bg-slate-800  border-blue-800 p-2 outline-none"
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </Input>

          <div className="gap-2 flex mt-2">
            <input
              type="checkbox"
              name="notifyme"
              id="notifyme"
              onClick={notifier}
            />
            <label htmlFor="notifyme">Notify me</label>
          </div>
          <span className="text-red-500">{message}</span>
          <div className="flex justify-end mt-auto bottom-0">
            <button
              type="submit"
              className="p-4 self-end outline-blue-900 outline outline-1 text-blue-900 hover:bg-blue-900 hover:text-white  rounded-md"
            >
              <SendHorizonal />
            </button>
          </div>
        </section>
      </form>
    </ModalTemplate>
  );
});

ModalReminder.displayName = ModalReminder;
