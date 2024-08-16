/* eslint-disable react/prop-types */
import { forwardRef, useCallback, useContext, useEffect } from "react";
import axiosInstance from "../../../utils/axiosConfig";
import { InformationContext, ToggleContext } from "../../../hooks/Context";
import { ModalTemplate } from "../ModalTemplate";

export const ModalDeleteInfo = forwardRef((prop, ref) => {
  const { deleteInformation, setDeleteInformation } =
    useContext(InformationContext);
  const { setToggleDeleteInfo } = useContext(ToggleContext);

  const deleteInformationButton = async () => {
    await axiosInstance
      .delete(`/information/${deleteInformation}`)
      .then((response) => {
        setDeleteInformation(response.data);
        setToggleDeleteInfo(false);
      });
  };

  useEffect(() => {
    console.log(deleteInformation);
  }, [deleteInformation]);

  const clickedOutside = useCallback(
    (e) => {
      console.log("ciclked created");
      if (ref.current && !ref.current.contains(e.target)) {
        setToggleDeleteInfo(false);
      }
    },
    [ref, setToggleDeleteInfo]
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
    <ModalTemplate ref={ref} title={"Delete Information"}>
      <div className="flex flex-col p-2">
        <button
          className="p-2 outline-red-500 outline outline-1 text-red-500 hover:bg-red-500 hover:text-white  rounded-md"
          onClick={deleteInformationButton}
        >
          Delete Information
        </button>
        <button onClick={() => setToggleDeleteInfo(false)} className="p-2">
          Cancel
        </button>
      </div>
    </ModalTemplate>
  );
});

ModalDeleteInfo.displayName = ModalDeleteInfo;
