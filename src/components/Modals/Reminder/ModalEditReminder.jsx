/* eslint-disable react/prop-types */
import { SendHorizonal } from "lucide-react";
import { forwardRef, useContext, useEffect, useState } from "react";
import { ReminderContext, ToggleContext } from "../../../hooks/Context";
import { ModalTemplate } from "../ModalTemplate";
import { Input } from "../../Input";
import axiosInstance from "../../../utils/axiosConfig";

export const ModalEditReminder = forwardRef((props, ref) => {
  const [message, setMessage] = useState("");
  const { editReminder, setEditReminder } = useContext(ReminderContext);
  const { setToggleEditRemi } = useContext(ToggleContext);

  const submitted = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance
        .patch(`/editreminder/${editReminder.id}`, editReminder)
        .then((response) => console.log(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const clickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setToggleEditRemi(false);
      }
    };
    document.addEventListener("mousedown", clickedOutside);

    return () => {
      document.removeEventListener("mousedown", clickedOutside);
    };
  }, [ref, setToggleEditRemi]);

  useEffect(() => {
    ref.current.focus();
  }, [ref]);

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
    <ModalTemplate title="Edit Reminder" ref={ref}>
      <form className="p-2" onSubmit={submitted}>
        <section>
          <Input
            title={"Title"}
            value={editReminder.title}
            onChange={(e) =>
              setEditReminder({ ...editReminder, title: e.target.value })
            }
          />
          <div>Information :</div>
          <Input
            title={"Date"}
            type="date"
            value={editReminder.date}
            onChange={(e) =>
              setEditReminder({ ...editReminder, date: e.target.value })
            }
          />
          <Input
            title={"Time"}
            type="time"
            value={editReminder.time}
            onChange={(e) =>
              setEditReminder({ ...editReminder, time: e.target.value })
            }
          />
          <Input title={"Description"}>
            <textarea
              placeholder="Description"
              className="w-full border-b-[1px] bg-slate-800  border-blue-800 p-2 outline-none"
              onChange={(e) =>
                setEditReminder({
                  ...editReminder,
                  description: e.target.value,
                })
              }
              value={editReminder.description}
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

ModalEditReminder.displayName = ModalEditReminder;
