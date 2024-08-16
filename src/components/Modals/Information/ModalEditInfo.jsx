/* eslint-disable react/prop-types */
import { SendHorizonal } from "lucide-react";
import { forwardRef, useContext, useEffect } from "react";
import { InformationContext, ToggleContext } from "../../../hooks/Context";
import { ModalTemplate } from "../ModalTemplate";
import { Input } from "../../Input";
import axiosInstance from "../../../utils/axiosConfig";

export const ModalEditInfo = forwardRef((props, ref) => {
  const { editInformation, setEditInformation } =
    useContext(InformationContext);
  const { setToggleEditInfo } = useContext(ToggleContext);

  const submitted = async () => {
    console.log(editInformation);
    try {
      await axiosInstance
        .patch(`/editinformation/${editInformation.id}`, editInformation)
        .then((response) => console.log(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const clickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setToggleEditInfo(false);
      }
    };

    return () => {
      document.addEventListener("mousedown", clickedOutside);
    };
  }, [ref, setToggleEditInfo]);

  useEffect(() => {
    ref.current.focus();
  }, [ref]);

  return (
    <ModalTemplate title="Edit Information" ref={ref}>
      <div className="p-2">
        <section>
          <Input
            title={"Title"}
            value={editInformation.title}
            onChange={(e) =>
              setEditInformation({ ...editInformation, title: e.target.value })
            }
          />
          <div>Information :</div>
          <Input
            title={"Link Youtube"}
            value={editInformation.link}
            onChange={(e) =>
              setEditInformation({ ...editInformation, link: e.target.value })
            }
          />

          <Input title={"Description"}>
            <textarea
              placeholder="Description"
              value={editInformation.description}
              className="w-full border-b-[1px] bg-slate-800  border-blue-800 p-2 outline-none"
              onChange={(e) =>
                setEditInformation({
                  ...editInformation,
                  description: e.target.value,
                })
              }
            />
          </Input>
          <div className="flex justify-end mt-auto bottom-0">
            <button
              type="submit"
              className="p-2 self-end outline-white outline outline-1  hover:bg-white hover:text-black rounded-md"
              onClick={submitted}
            >
              <SendHorizonal />
            </button>
          </div>
        </section>
      </div>
    </ModalTemplate>
  );
});

ModalEditInfo.displayName = ModalEditInfo;
