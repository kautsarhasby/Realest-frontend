/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import echoInstance from "../utils/echo";
import axiosInstance from "../utils/axiosConfig";
import { EventContext } from "./Context";

export default function EventProvider({ children, room_id }) {
  const [events, setEvents] = useState([]);
  const [deleteEvent, setDeleteEvent] = useState();
  const [editEvent, setEditEvent] = useState();

  useEffect(() => {
    const fetching = async () => {
      await axiosInstance.get(`/event/${room_id}`).then((response) => {
        setEvents(response.data.events);
      });
    };
    fetching();
  }, [room_id]);

  useEffect(() => {
    const channel = echoInstance.channel(`channel-${room_id}`);

    const handleSendEvent = async (sendData) => {
      console.log(sendData);
      setEvents((prev) => [...prev, sendData.event]);
    };

    const handleDeleteEvent = async (deletedEvent) => {
      setEvents((prev) =>
        prev.filter((item) => item.id !== deletedEvent.event.id)
      );
    };

    const handleUpdateEvent = async (updatedEvent) => {
      const response = await axiosInstance.get(`/event/${room_id}`);

      const data = response.data.events.filter(
        (item) => item.id == updatedEvent.event.id
      );
      setEvents((prev) =>
        prev.map((item) => (item.id === data[0].id ? data[0] : item))
      );
    };

    channel.listen("Event_Date\\SendEventEvent", handleSendEvent);
    channel.listen("Event_Date\\DeleteEventEvent", handleDeleteEvent);
    channel.listen("Event_Date\\UpdateEventEvent", handleUpdateEvent);

    return () => {
      channel.stopListening("Event_Date\\SendEventEvent");
      channel.stopListening("Event_Date\\DeleteEventEvent");
      channel.stopListening("Event_Date\\UpdateEventEvent");
    };
  }, [room_id]);
  return (
    <EventContext.Provider
      value={{
        events,
        setEvents,
        deleteEvent,
        setDeleteEvent,
        editEvent,
        setEditEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
