/* eslint-disable react/prop-types */
import { SendHorizonal } from "lucide-react";
import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import axiosInstance from "../../../utils/axiosConfig";
import { MessageContext, ToggleContext } from "../../../hooks/Context";
import { ModalTemplate } from "../ModalTemplate";

export const ModalEdit = forwardRef(({ room_id }, ref) => {
  const { editMessage, fixedEdit, setFixedEdit } = useContext(MessageContext);
  const { setToggleMessage } = useContext(ToggleContext);
  const [editing, setEdited] = useState("");
  const editInputRef = useRef();

  const submitted = async () => {
    setFixedEdit({ ...fixedEdit, message: editing, edited: 1 });
    try {
      await axiosInstance
        .patch(`/editmessage/${editMessage.id}`, {
          message: editing,
          edited: true,
        })
        .then((response) => response.data && setToggleMessage(false));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const render = async () => {
      await axiosInstance.get(`/message/${room_id}`).then((response) => {
        const res = response.data.message.filter(
          (item) => item.id == editMessage.id
        );
        setFixedEdit(res[0]);
      });
    };
    render();
  }, [room_id, editMessage, setFixedEdit]);

  useEffect(() => {
    const clickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setToggleMessage(false);
      }
    };

    return () => {
      document.addEventListener("mousedown", clickedOutside);
    };
  }, [ref, setToggleMessage]);

  useEffect(() => {
    editInputRef.current.focus();
  }, []);

  return (
    <ModalTemplate title="Edit Message" ref={ref}>
      <div className="grid grid-rows-2 w-full h-full items-center  p-2">
        <div className="sm:rounded-tr-2xl text-black sm:rounded-tl-2xl sm:rounded-bl-2xl w-full flex flex-col  mt-6 px-6 py-4 bg-white shadow-md">
          {editMessage.message}
        </div>
        <div className="botom-0 mt-auto w-full flex items-center gap-4">
          <input
            type="text"
            name="message"
            ref={editInputRef}
            id=""
            placeholder="Edit Message"
            className="w-full rounded-md py-2.5 px-4 border text-sm outline-slate-800"
            autoComplete="off"
            onChange={(e) => setEdited(e.target.value)}
          />
          <button className="p-2 bg-slate-800 rounded-md" onClick={submitted}>
            <SendHorizonal color="white" />
          </button>
        </div>
      </div>
    </ModalTemplate>
  );
});

ModalEdit.displayName = ModalEdit;
