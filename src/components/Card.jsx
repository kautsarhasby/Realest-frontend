/* eslint-disable react/prop-types */
import {
  Calendar,
  CalendarCheck,
  Clock,
  EllipsisVertical,
  Link,
  MapPin,
} from "lucide-react";
import { useContext, useState } from "react";
import { EventContext, ReminderContext, ToggleContext } from "../hooks/Context";

export const Card = ({
  id,
  title,
  date,
  place,
  time,
  maps,
  agenda,
  description,
  username,
  type,
  data,
}) => {
  const {
    setToggleDeleteRemi,
    setToggleEditRemi,
    setToggleDeleteEv,
    setToggleEditEv,
  } = useContext(ToggleContext);
  const { setDeleteReminder, setEditReminder } = useContext(ReminderContext);
  const { setDeleteEvent, setEditEvent } = useContext(EventContext);
  const [open, setOpen] = useState(false);

  return (
    <main className="w-full my-8 snap-center shadow-blue-500/50 bg-slate-800 text-white rounded-lg shadow-md">
      <div className="h-full flex flex-col ">
        <div className="w-full border-b-2 p-2 flex justify-between items-center relative">
          <span className="font-bold text-2xl">{title}</span>
          <div
            className="cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            <EllipsisVertical className="text-slate-400" size={20} />
          </div>
          <section
            className={`absolute  bg-slate-800 right-8 flex flex-col text-white shadow-md shadow-black rounded-lg w-40 h-auto transition-all ${
              open ? "scale-100" : "scale-0 -right-10"
            }`}
          >
            <button
              className="hover:bg-slate-600 text-center rounded-t-md "
              onClick={() => {
                if (type == "events") {
                  setToggleDeleteEv((prev) => !prev);
                  setDeleteEvent(id);
                } else if (type == "reminders") {
                  setToggleDeleteRemi((prev) => !prev);
                  setDeleteReminder(id);
                }
              }}
            >
              Delete
            </button>
            <button
              className="hover:bg-slate-600 text-center rounded-b-md"
              onClick={() => {
                if (type == "events") {
                  setEditEvent(data);
                  setToggleEditEv((prev) => !prev);
                } else if (type == "reminders") {
                  setEditReminder(data);
                  setToggleEditRemi((prev) => !prev);
                }
              }}
            >
              Edit
            </button>
          </section>
        </div>
        <div className="p-2">
          <div className="font-semibold">Information :</div>
        </div>
        <div className="flex flex-col gap-y-2 px-6 font-semibold">
          <section className="flex gap-2">
            <Calendar />
            <span>Date : {date}</span>
          </section>
          {type == "events" && (
            <section className="flex gap-2">
              <MapPin />
              <span>Place : {place}</span>
            </section>
          )}
          {type == "events" && (
            <section className="flex gap-2">
              <Link />
              <span>
                Map Link : {""}
                <a
                  href={maps}
                  className="hover:underline hover:text-blue-600 cursor-pointer"
                  target="_blank"
                >
                  Gmaps
                </a>
              </span>
            </section>
          )}

          <section className="flex gap-2">
            <Clock />
            <span>Time : {time}</span>
          </section>
          {type == "events" && (
            <section className="flex gap-2">
              <CalendarCheck />
              <span>Agenda :{agenda}</span>
            </section>
          )}
        </div>
        <div className="p-2   ">
          Description :<article className="break-words">{description}</article>
        </div>
        <div className="mt-auto bottom-0 p-2">
          Made by <span className="font-bold">{username}</span>
        </div>
      </div>
    </main>
  );
};
