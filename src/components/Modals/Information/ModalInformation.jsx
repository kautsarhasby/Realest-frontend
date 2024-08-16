import { forwardRef, useContext, useEffect, useState } from "react";
import { ModalTemplate } from "../ModalTemplate";
import { SendHorizonal } from "lucide-react";
import { Input } from "../../Input";
import { ToggleContext } from "../../../hooks/Context";
import axiosInstance from "../../../utils/axiosConfig";

export const ModalInformation = forwardRef((prop, ref) => {
  const { setToggleInformation } = useContext(ToggleContext);
  const sessionItem = JSON.parse(sessionStorage.getItem("data"));
  const [data, setData] = useState({
    title: "",
    description: "",
    link: "",
  });

  useEffect(() => {
    const clickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setToggleInformation(false);
      }
    };

    return () => {
      document.addEventListener("mousedown", clickedOutside);
    };
  }, [ref, setToggleInformation]);

  const submitted = async (e) => {
    e.preventDefault();

    data.author = sessionItem.username;
    data.author_id = sessionItem.user_id;
    data.room_id = sessionItem.room_id;
    console.log(data);
    await axiosInstance
      .post(`/information`, data)
      .then(
        (response) => response.status == 200 && setToggleInformation(false)
      );
  };

  return (
    <ModalTemplate title={"Create Information"} ref={ref}>
      <form className="p-2" method="POST">
        <section>
          <Input
            title={"Title"}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          <div>Information :</div>
          <Input
            title={"Link Youtube"}
            onChange={(e) => setData({ ...data, link: e.target.value })}
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
      </form>
    </ModalTemplate>
  );
});

ModalInformation.displayName = ModalInformation;
