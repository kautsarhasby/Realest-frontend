import { forwardRef } from "react";

/* eslint-disable react/prop-types */
export const Input = forwardRef(
  ({ title, onChange, children, value, type = "text" }, ref) => {
    return (
      <div className="flex flex-col p-2">
        <label htmlFor="" className=" font-bold">
          {title}
        </label>
        {children || (
          <input
            type={type}
            name={title}
            placeholder={title}
            ref={ref}
            value={value}
            className="w-full border-b-[1px] bg-slate-800   border-blue-800 p-2 outline-none"
            onChange={onChange}
            autoComplete="off"
          />
        )}
      </div>
    );
  }
);

Input.displayName = Input;
