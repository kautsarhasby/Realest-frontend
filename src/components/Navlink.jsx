/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export const Navlink = ({ activePath, children, to, title }) => {
  return (
    <Link
      to={to}
      className={`relative hover:text-blue-500  transition-colors duration-300 ${
        activePath == title ? "bg-blue-900 text-white" : "bg-transparent"
      } rounded-full p-2`}
    >
      {children}
    </Link>
  );
};
