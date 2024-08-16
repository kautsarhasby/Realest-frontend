import { useCallback, useEffect } from "react";

export const useExit = ({ ref, setToggle }) => {
  const clickedOutside = useCallback(
    (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setToggle(false);
      }
    },
    [ref, setToggle]
  );

  useEffect(() => {
    document.addEventListener("mousedown", clickedOutside);

    return () => {
      document.removeEventListener("mousedown", clickedOutside);
    };
  }, [clickedOutside]);
};
