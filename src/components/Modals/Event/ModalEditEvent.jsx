/* eslint-disable react/prop-types */
import { SendHorizonal } from "lucide-react";
import { forwardRef, useContext, useEffect } from "react";
import { EventContext, ToggleContext } from "../../../hooks/Context";
import { ModalTemplate } from "../ModalTemplate";
import { Input } from "../../Input";
import axiosInstance from "../../../utils/axiosConfig";

export const ModalEditEvent = forwardRef((props, ref) => {
  const { editEvent, setEditEvent } = useContext(EventContext);
  const { setToggleEditEv } = useContext(ToggleContext);

  const submitted = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance
        .patch(`/editevent/${editEvent.id}`, editEvent)
        .then((response) => console.log(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const clickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setToggleEditEv(false);
      }
    };
    document.addEventListener("mousedown", clickedOutside);

    return () => {
      document.removeEventListener("mousedown", clickedOutside);
    };
  }, [ref, setToggleEditEv]);

  useEffect(() => {
    ref.current.focus();
  }, [ref]);

  return (
    <ModalTemplate title="Edit Event" ref={ref}>
      <form className="p-2" onSubmit={submitted} method="POST">
        <section>
          <Input
            title={"Title"}
            value={editEvent.title}
            onChange={(e) =>
              setEditEvent({ ...editEvent, title: e.target.value })
            }
          />
          <div>Information :</div>
          <Input
            title={"Date"}
            type="date"
            value={editEvent.date}
            onChange={(e) =>
              setEditEvent({ ...editEvent, date: e.target.value })
            }
          />
          <Input
            title={"Place"}
            value={editEvent.place}
            onChange={(e) =>
              setEditEvent({ ...editEvent, place: e.target.value })
            }
          />
          <Input
            title={"Map (optional)"}
            value={editEvent.maps}
            onChange={(e) =>
              setEditEvent({ ...editEvent, maps: e.target.value })
            }
          />
          <Input
            title={"Time"}
            type="time"
            value={editEvent.time}
            onChange={(e) =>
              setEditEvent({ ...editEvent, time: e.target.value })
            }
          />
          <Input
            title={"Agenda"}
            value={editEvent.agenda}
            onChange={(e) =>
              setEditEvent({ ...editEvent, agenda: e.target.value })
            }
          />
          <Input title={"Description"}>
            <textarea
              placeholder="Description"
              value={editEvent.description}
              className="w-full border-b-[1px] bg-slate-800 border-blue-800 p-2 outline-none"
              onChange={(e) =>
                setEditEvent({ ...editEvent, description: e.target.value })
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

ModalEditEvent.displayName = ModalEditEvent;
