/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import echoInstance from "../utils/echo";
import axiosInstance from "../utils/axiosConfig";
import { ReminderContext } from "./Context";

function ReminderProvider({ children, room_id }) {
  const [reminders, setReminders] = useState([]);
  const [deleteReminder, setDeleteReminder] = useState();
  const [editReminder, setEditReminder] = useState();
  useEffect(() => {
    const fetching = async () => {
      await axiosInstance.get(`/reminder/${room_id}`).then((response) => {
        setReminders(response.data.reminders);
      });
    };
    return () => {
      fetching();
    };
  }, [room_id]);

  useEffect(() => {
    const channel = echoInstance.channel(`channel-${room_id}`);

    const handleSendReminder = async (sendData) => {
      console.log(sendData);
      setReminders((prev) => [...prev, sendData.reminder]);
    };

    const handleDeleteReminder = async (deletedReminder) => {
      console.log(deletedReminder);
      setReminders((prev) =>
        prev.filter((item) => item.id !== deletedReminder.reminder.id)
      );
    };

    const handleUpdateReminder = async (UpdatedReminder) => {
      const response = await axiosInstance.get(`/reminder/${room_id}`);
      console.log(response.data);
      const data = response.data.reminders.filter(
        (item) => item.id == UpdatedReminder.reminder.id
      );
      setReminders((prev) =>
        prev.map((item) => (item.id === data[0].id ? data[0] : item))
      );
    };

    channel.listen("Reminder\\SendReminderEvent", handleSendReminder);
    channel.listen("Reminder\\DeleteReminderEvent", handleDeleteReminder);
    channel.listen("Reminder\\UpdateReminderEvent", handleUpdateReminder);

    return () => {
      channel.stopListening("Reminder\\SendReminderEvent");
      channel.stopListening("Reminder\\DeleteReminderEvent");
      channel.stopListening("Reminder\\UpdateReminderEvent");
    };
  }, [room_id, deleteReminder]);
  return (
    <ReminderContext.Provider
      value={{
        reminders,
        setReminders,
        deleteReminder,
        setDeleteReminder,
        editReminder,
        setEditReminder,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
}

export default ReminderProvider;
