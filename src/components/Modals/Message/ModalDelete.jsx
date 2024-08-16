/* eslint-disable react/prop-types */
import { forwardRef, useCallback, useContext, useEffect } from "react";
import axiosInstance from "../../../utils/axiosConfig";
import { MessageContext, ToggleContext } from "../../../hooks/Context";
import { ModalTemplate } from "../ModalTemplate";

export const ModalDelete = forwardRef((prop, ref) => {
  const { deleted, setDeleted } = useContext(MessageContext);
  const { setToggleDelete } = useContext(ToggleContext);

  const deleteMessageButton = async () => {
    await axiosInstance.delete(`/message/${deleted.id}`).then((response) => {
      setDeleted(response.data);
      setToggleDelete(false);
    });
  };

  const clickedOutside = useCallback(
    (e) => {
      console.log("ciclked created");
      if (ref.current && !ref.current.contains(e.target)) {
        setToggleDelete(false);
      }
    },
    [ref, setToggleDelete]
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
    <ModalTemplate ref={ref} title={"Delete Message?"}>
      <div className="flex flex-col p-2">
        <button
          className="p-2 outline-red-500 outline outline-1 text-red-500 hover:bg-red-500 hover:text-white  rounded-md"
          onClick={deleteMessageButton}
        >
          Delete Message
        </button>
        <button onClick={() => setToggleDelete(false)}>Cancel</button>
      </div>
    </ModalTemplate>
  );
});

ModalDelete.displayName = ModalDelete;
