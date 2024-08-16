import {
  Bell,
  Calendar,
  CalendarClock,
  CalendarDays,
  CalendarPlus,
  Frown,
} from "lucide-react";
import { Card } from "../components/Card";
import { useContext, useState } from "react";
import { EventContext, ReminderContext, ToggleContext } from "../hooks/Context";

export default function Event() {
  const { setToggleEvent, setToggleReminder } = useContext(ToggleContext);
  const { events } = useContext(EventContext);
  const { reminders } = useContext(ReminderContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="flex items-center flex-col justify-center min-h-screen relative transition-all">
      <div
        className="fixed flex items-center justify-center m-4 right-0 bottom-0 w-24 h-24  rounded-full bg-blue-400 shadow-md cursor-pointer hover:bg-blue-600 active:bg-blue-200 active:text-black z-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CalendarPlus size={50} className=" text-white" />
      </div>
      <div
        className={`fixed flex items-center justify-center m-4 right-2  w-20 h-20  transition-all duration-100 rounded-full bg-blue-400 shadow-md cursor-pointer hover:bg-blue-600 active:bg-blue-200 active:text-black z-[5] ${
          isOpen ? "bottom-28" : "bottom-0"
        }`}
        onClick={() => setToggleEvent((prev) => !prev)}
      >
        <CalendarDays size={30} className=" text-white" />
      </div>
      <div
        className={`fixed flex items-center justify-center m-4 bottom-2  w-20 h-20  transition-all duration-100 rounded-full bg-blue-400 shadow-md cursor-pointer hover:bg-blue-600 active:bg-blue-200 active:text-black z-[5] ${
          isOpen ? "right-28" : "right-0"
        }`}
        onClick={() => setToggleReminder((prev) => !prev)}
      >
        <CalendarClock size={30} className=" text-white" />
      </div>
      <div className="mt-24 w-full flex h-full justify-center">
        <section className="w-full flex  flex-col items-center">
          <span className="text-white flex justify-center gap-2 text-lg">
            <Calendar />
            Event
          </span>
          <div className="p-2 snap-mandatory snap-y  items-center justify-center overflow-y-auto h-[80vh]  w-1/2">
            {events.length > 0 ? (
              events.map((event, index) => {
                return (
                  <Card
                    id={event.id}
                    title={event.title}
                    date={event.date}
                    place={event.place}
                    maps={event.maps}
                    time={event.time}
                    agenda={event.agenda}
                    description={event.description}
                    username={event.username}
                    type={event.table_name}
                    data={event}
                    key={index}
                  />
                );
              })
            ) : (
              <div className="text-center flex flex-col justify-center h-full   text-slate-400">
                <div className=" flex justify-center gap-2">
                  <span>No events</span>
                  <Frown />
                </div>
                Click blue button to start make an event
              </div>
            )}
          </div>
        </section>
        <section className="w-full flex items-center flex-col ">
          <span className="text-white flex gap-2 text-lg justify-center">
            <Bell />
            Reminders
          </span>
          <div className="p-2 snap-mandatory  items-center justify-center overflow-y-auto h-[80vh]  w-1/2">
            {reminders.length > 0 ? (
              reminders.map((reminder, index) => {
                return (
                  <Card
                    id={reminder.id}
                    title={reminder.title}
                    date={reminder.date}
                    time={reminder.time}
                    description={reminder.description}
                    username={reminder.username}
                    type={reminder.table_name}
                    key={index}
                    data={reminder}
                  />
                );
              })
            ) : (
              <div className="text-center flex flex-col justify-center h-full   text-slate-400">
                <div className=" flex justify-center gap-2">
                  <span>No reminders</span>
                  <Frown />
                </div>
                Click blue button to start make an reminders
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
