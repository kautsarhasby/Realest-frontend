import { useContext, useRef } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import MessageProvider from "../hooks/MessageProvider";
import { ModalDelete } from "../components/Modals/Message/ModalDelete";
import { ModalEdit } from "../components/Modals/Message/ModalEdit";
import EventProvider from "../hooks/EventProvider";
import {
  BookOpenText,
  Calendar,
  DoorOpen,
  LogOut,
  MessageSquareText,
} from "lucide-react";
import ReminderProvider from "../hooks/ReminderProvider";
import { Navlink } from "../components/Navlink";
import { exitCB } from "../utils/exitCB";
import { ModalInformation } from "../components/Modals/Information/ModalInformation";
import { ToggleContext } from "../hooks/Context";
import InformationProvider from "../hooks/InformationProvider";
import { ModalDeleteInfo } from "../components/Modals/Information/ModalDeleteInfo";
import { ModalEditInfo } from "../components/Modals/Information/ModalEditInfo";
import { ModalDeleteReminder } from "../components/Modals/Reminder/ModalDeleteReminder";
import { ModalReminder } from "../components/Modals/Reminder/ModalReminder";
import { ModalEvent } from "../components/Modals/Event/ModalEvent";
import { ModalDeleteEvent } from "../components/Modals/Event/ModalDeleteEvent";
import { ModalEditReminder } from "../components/Modals/Reminder/ModalEditReminder";
import { ModalEditEvent } from "../components/Modals/Event/ModalEditEvent";

export default function LayoutChat() {
  const { username, room_id } = JSON.parse(sessionStorage.getItem("data"));
  const {
    toggleMessage,
    toggleDelete,
    toggleEvent,
    toggleDeleteEv,
    toggleReminder,
    toggleDeleteRemi,
    toggleEditRemi,
    toggleEditEv,
    toggleInformation,
    toggleDeleteInfo,
    toggleEditInfo,
  } = useContext(ToggleContext);

  const navigate = useNavigate();

  const location = useLocation().pathname.split("/");
  const activePath = location[location.length - 1];

  const modalRef = useRef();
  const modalDeleteRef = useRef();
  const modalEventRef = useRef();
  const modalDeleteEvent = useRef();
  const modalEditEvent = useRef();
  const modalReminderRef = useRef();
  const modalEditRemiRef = useRef();
  const modalDeleteRemiRef = useRef();
  const modalInformationRef = useRef();
  const modalDeleteInfoRef = useRef();
  const modalEditInfoRef = useRef();

  const exitRoom = () => {
    const getData = JSON.parse(sessionStorage.getItem("data"));
    getData.room_id = "";
    sessionStorage.setItem("data", JSON.stringify(getData));
    navigate("/room");
  };

  return (
    <MessageProvider room_id={room_id}>
      <EventProvider room_id={room_id}>
        <ReminderProvider room_id={room_id}>
          <InformationProvider room_id={room_id}>
            <main
              className={`relative  bg-slate-900 min-h-screen ${
                toggleMessage ||
                toggleDelete ||
                toggleEvent ||
                toggleDeleteEv ||
                toggleEditEv ||
                toggleReminder ||
                toggleEditRemi ||
                toggleDeleteRemi ||
                toggleInformation ||
                toggleDeleteInfo ||
                toggleEditInfo
                  ? " overflow-hidden h-screen"
                  : ""
              } 
         }`}
            >
              <div
                className={`transition-all  delay-100
            ${
              toggleMessage ||
              toggleDelete ||
              toggleEvent ||
              toggleDeleteEv ||
              toggleEditEv ||
              toggleReminder ||
              toggleEditRemi ||
              toggleDeleteRemi ||
              toggleInformation ||
              toggleDeleteInfo ||
              toggleEditInfo
                ? " bg-black/50 w-screen h-screen absolute  z-40"
                : "bg-transparent "
            }
          `}
              ></div>
              {toggleMessage && <ModalEdit ref={modalRef} room_id={room_id} />}
              {toggleDelete && <ModalDelete ref={modalDeleteRef} />}
              {toggleEvent && (
                <ModalEvent ref={modalEventRef} room_id={room_id} />
              )}
              {toggleDeleteEv && (
                <ModalDeleteEvent ref={modalDeleteEvent} room_id={room_id} />
              )}
              {toggleEditEv && (
                <ModalEditEvent ref={modalEditEvent} room_id={room_id} />
              )}
              {toggleReminder && (
                <ModalReminder ref={modalReminderRef} room_id={room_id} />
              )}
              {toggleEditRemi && (
                <ModalEditReminder ref={modalEditRemiRef} room_id={room_id} />
              )}
              {toggleDeleteRemi && (
                <ModalDeleteReminder
                  ref={modalDeleteRemiRef}
                  room_id={room_id}
                />
              )}
              {toggleInformation && (
                <ModalInformation ref={modalInformationRef} room_id={room_id} />
              )}
              {toggleDeleteInfo && (
                <ModalDeleteInfo ref={modalDeleteInfoRef} room_id={room_id} />
              )}
              {toggleEditInfo && (
                <ModalEditInfo ref={modalEditInfoRef} room_id={room_id} />
              )}
              <nav className="w-full bg-slate-800 h-20 shadow-md shadow-blue-500/50 grid p-4 fixed top-0 z-10 text-white">
                <div className="flex items-center justify-between ">
                  <div className="text-2xl font-semibold ">
                    <Link to={"/chat"}>Realest Chats</Link>
                  </div>
                  <ul className="flex gap-6 transition-all ">
                    <Navlink
                      to={"/chat"}
                      activePath={activePath}
                      title={"chat"}
                    >
                      <MessageSquareText />
                    </Navlink>

                    <Navlink
                      to={"event"}
                      activePath={activePath}
                      title={"calendar"}
                    >
                      <Calendar />
                    </Navlink>
                    <Navlink
                      to={"learning"}
                      activePath={activePath}
                      title={"learning"}
                    >
                      <BookOpenText />
                    </Navlink>
                  </ul>
                  <div className="flex items-center">
                    <span className="font-bold">{username}</span>
                    <button onClick={exitRoom}>
                      <DoorOpen />
                    </button>
                    <button onClick={() => exitCB(() => navigate("/login"))}>
                      <LogOut />
                    </button>
                  </div>
                </div>
              </nav>
              <div>
                <Outlet />
              </div>
            </main>
          </InformationProvider>
        </ReminderProvider>
      </EventProvider>
    </MessageProvider>
  );
}
