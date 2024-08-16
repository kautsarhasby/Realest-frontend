import { useEffect, useState } from "react";
import echoInstance from "../utils/echo";
import axiosInstance from "../utils/axiosConfig";
import { MessageContext } from "./Context";

// eslint-disable-next-line react/prop-types
function MessageProvider({ children, room_id }) {
  const [messageText, setMessageText] = useState([]);
  const [editMessage, setEditMessage] = useState();
  const [fixedEdit, setFixedEdit] = useState();
  const [editedText, setEditedText] = useState();
  const [deleted, setDeleted] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const channel = echoInstance.channel(`channel-${room_id}`);
    const handleSendMessage = async (sendData) => {
      console.log(sendData);
      const response = await axiosInstance.get(`/message/${room_id}`);

      const data = response.data.message.filter(
        (item) => item.id == sendData.message.id
      );
      setMessageText((prev) => [...prev, data[0]]);
    };

    const handleDeleteMessage = async (deletedMessage) => {
      console.log(deletedMessage);
      setMessageText((prev) =>
        prev.filter((item) => item.id !== deletedMessage.message.id)
      );
    };

    const handleUpdateMessage = async (UpdatedMessage) => {
      const response = await axiosInstance.get(`/message/${room_id}`);

      const data = response.data.message.filter(
        (item) => item.id == UpdatedMessage.message.id
      );
      setMessageText((prev) =>
        prev.map((item) => (item.id === data[0].id ? data[0] : item))
      );
    };

    channel.listen("Message\\SendMessageEvent", handleSendMessage);
    channel.listen("Message\\DeleteMessageEvent", handleDeleteMessage);
    channel.listen("Message\\UpdateMessageEvent", handleUpdateMessage);

    return () => {
      channel.stopListening("Message\\SendMessageEvent");
      channel.stopListening("Message\\DeleteMessageEvent");
      channel.stopListening("Message\\UpdateMessageEvent");
    };
  }, [room_id]);

  useEffect(() => {
    const renderMessage = async () => {
      await axiosInstance.get(`/message/${room_id}`).then((response) => {
        setMessageText(response.data.message);
        if (response.data.message) {
          setLoading(false);
        }
      });
    };
    renderMessage();
  }, [room_id]);

  return (
    <MessageContext.Provider
      value={{
        messageText,
        setMessageText,
        editMessage,
        setEditMessage,
        fixedEdit,
        setFixedEdit,
        editedText,
        setEditedText,
        deleted,
        setDeleted,
        loading,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export default MessageProvider;
