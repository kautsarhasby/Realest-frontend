/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import echoInstance from "../utils/echo";
import { InformationContext } from "./Context";

export default function InformationProvider({ room_id, children }) {
  const [informations, setInformations] = useState([]);
  const [deleteInformation, setDeleteInformation] = useState("");
  const [editInformation, setEditInformation] = useState("");

  useEffect(() => {
    const fetching = async () => {
      await axiosInstance.get(`/information/${room_id}`).then((response) => {
        setInformations(response.data.informations);
      });
    };
    fetching();
  }, [room_id]);

  useEffect(() => {
    const channel = echoInstance.channel(`channel-${room_id}`);

    const handleSendInformation = async (sendData) => {
      const response = await axiosInstance.get(`/information/${room_id}`);
      const data = response.data.informations.filter(
        (item) => item.id === sendData.information.id
      );
      setInformations((prev) => [...prev, data[0]]);
    };

    const handleDeleteInformation = async (deletedInformation) => {
      setInformations((prev) =>
        prev.filter((item) => item.id !== deletedInformation.information.id)
      );
    };

    const handleUpdateInformation = async (updatedInformation) => {
      const response = await axiosInstance.get(`/information/${room_id}`);

      const data = response.data.informations.filter(
        (item) => item.id == updatedInformation.information.id
      );
      setInformations((prev) =>
        prev.map((item) => (item.id === data[0].id ? data[0] : item))
      );
    };

    channel.listen("Information\\SendInformationEvent", handleSendInformation);
    channel.listen(
      "Information\\DeleteInformationEvent",
      handleDeleteInformation
    );
    channel.listen(
      "Information\\UpdateInformationEvent",
      handleUpdateInformation
    );

    return () => {
      channel.stopListening("Information\\SendInformationEvent");
      channel.stopListening("Information\\DeleteInformationEvent");
      channel.stopListening("Information\\UpdateInformationEvent");
    };
  }, [room_id]);
  return (
    <InformationContext.Provider
      value={{
        informations,
        setInformations,
        deleteInformation,
        setDeleteInformation,
        editInformation,
        setEditInformation,
      }}
    >
      {children}
    </InformationContext.Provider>
  );
}
