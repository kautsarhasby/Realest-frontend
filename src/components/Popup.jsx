import { useContext, memo } from "react";
import { MessageContext, ToggleContext } from "../hooks/Context";

// eslint-disable-next-line react/prop-types
const Popup = ({ data }) => {
  const { setEditMessage, setDeleted } = useContext(MessageContext);

  const { toggleMessage, setToggleMessage, setToggleDelete, setType } =
    useContext(ToggleContext);
  if (toggleMessage == false) {
    return (
      <main className={`absolute right-6`}>
        <main className="absolute right-0 bg-white shadow-lg rounded-lg w-64">
          <div className="">
            <button
              className="hover:bg-slate-200 rounded-t-lg block w-full text-start p-2"
              onClick={() => {
                setEditMessage(data);
                setToggleMessage((prev) => !prev);
              }}
            >
              Edit Text
            </button>
            <button
              className="hover:bg-slate-200 rounded-b-lg block w-full text-start p-2"
              onClick={() => {
                setDeleted(data);
                setToggleDelete((prev) => !prev);
                setType("message");
              }}
            >
              Delete Message
            </button>
          </div>
        </main>
      </main>
    );
  }
};

export default memo(Popup);
