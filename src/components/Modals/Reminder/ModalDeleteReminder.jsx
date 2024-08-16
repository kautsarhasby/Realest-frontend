/* eslint-disable react/prop-types */
import { forwardRef, useCallback, useContext, useEffect } from "react";
import axiosInstance from "../../../utils/axiosConfig";
import { ReminderContext, ToggleContext } from "../../../hooks/Context";
import { ModalTemplate } from "../ModalTemplate";
export const ModalDeleteReminder = forwardRef((prop, ref) => {
  const { deleteReminder, setDeleteReminder } = useContext(ReminderContext);
  const { setToggleDeleteRemi } = useContext(ToggleContext);

  const deleteReminderButton = async () => {
    await axiosInstance
      .delete(`/reminder/${deleteReminder}`)
      .then((response) => {
        setDeleteReminder(response.data);
      })
      .finally(() => setToggleDeleteRemi(false));
  };

  const clickedOutside = useCallback(
    (e) => {
      console.log("ciclked created");
      if (ref.current && !ref.current.contains(e.target)) {
        setToggleDeleteRemi(false);
      }
    },
    [ref, setToggleDeleteRemi]
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
    <ModalTemplate ref={ref} title={"Delete Reminder?"}>
      <div className="flex flex-col p-2">
        <button
          className="p-2 outline-red-500 outline outline-1 text-red-500 hover:bg-red-500 hover:text-white  rounded-md"
          onClick={deleteReminderButton}
        >
          Delete Reminder
        </button>
        <button onClick={() => setToggleDeleteRemi(false)}>Cancel</button>
      </div>
    </ModalTemplate>
  );
});

ModalDeleteReminder.displayName = ModalDeleteReminder;
