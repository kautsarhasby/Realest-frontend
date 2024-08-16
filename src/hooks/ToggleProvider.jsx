import { useState } from "react";
import { ToggleContext } from "./Context";

// eslint-disable-next-line react/prop-types
function ToggleProvider({ children }) {
  const [toggleMessage, setToggleMessage] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [toggleEvent, setToggleEvent] = useState(false);
  const [toggleDeleteEv, setToggleDeleteEv] = useState(false);
  const [toggleEditEv, setToggleEditEv] = useState(false);

  const [toggleReminder, setToggleReminder] = useState(false);
  const [toggleEditRemi, setToggleEditRemi] = useState(false);
  const [toggleDeleteRemi, setToggleDeleteRemi] = useState(false);
  const [toggleInformation, setToggleInformation] = useState(false);
  const [toggleDeleteInfo, setToggleDeleteInfo] = useState(false);
  const [toggleEditInfo, setToggleEditInfo] = useState(false);

  return (
    <ToggleContext.Provider
      value={{
        toggleMessage,
        setToggleMessage,
        toggleDelete,
        setToggleDelete,
        toggleEvent,
        setToggleEvent,
        toggleDeleteEv,
        setToggleDeleteEv,
        toggleEditEv,
        setToggleEditEv,
        toggleReminder,
        setToggleReminder,
        toggleInformation,
        setToggleInformation,
        toggleDeleteInfo,
        setToggleDeleteInfo,
        toggleEditInfo,
        setToggleEditInfo,
        toggleDeleteRemi,
        setToggleDeleteRemi,
        toggleEditRemi,
        setToggleEditRemi,
      }}
    >
      {children}
    </ToggleContext.Provider>
  );
}

export default ToggleProvider;
