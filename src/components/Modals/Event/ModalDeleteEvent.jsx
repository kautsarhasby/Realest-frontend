/* eslint-disable react/prop-types */
import { forwardRef, useCallback, useContext, useEffect } from "react";
import axiosInstance from "../../../utils/axiosConfig";
import { EventContext, ToggleContext } from "../../../hooks/Context";
import { ModalTemplate } from "../ModalTemplate";
export const ModalDeleteEvent = forwardRef((prop, ref) => {
  const { deleteEvent, setDeleteEvent } = useContext(EventContext);
  const { setToggleDeleteEv } = useContext(ToggleContext);

  const deleteEventButton = async () => {
    await axiosInstance
      .delete(`/event/${deleteEvent}`)
      .then((response) => {
        setDeleteEvent(response.data);
      })
      .finally(() => setToggleDeleteEv(false));
  };

  useEffect(() => {
    console.log(deleteEvent);
  }, [deleteEvent]);

  const clickedOutside = useCallback(
    (e) => {
      console.log("ciclked created");
      if (ref.current && !ref.current.contains(e.target)) {
        setToggleDeleteEv(false);
      }
    },
    [ref, setToggleDeleteEv]
  );
  useEffect(() => {
    console.log("ini render useffect");

    document.addEventListener("mousedown", clickedOutside);
    return () => {
      console.log("ini render useffect dihapus");
      document.removeEventListener("mousedown", clickedOutside);
    };
  }, [clickedOutside]);

  return (
    <ModalTemplate ref={ref} title={"Delete Event?"}>
      <div className="flex flex-col p-2">
        <button
          className="p-2 outline-red-500 outline outline-1 text-red-500 hover:bg-red-500 hover:text-white  rounded-md"
          onClick={deleteEventButton}
        >
          Delete Event
        </button>
        <button onClick={() => setToggleDeleteEv(false)}>Cancel</button>
      </div>
    </ModalTemplate>
  );
});

ModalDeleteEvent.displayName = ModalDeleteEvent;
