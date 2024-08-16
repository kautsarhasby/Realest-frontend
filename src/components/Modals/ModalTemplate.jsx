import { forwardRef } from "react";

/* eslint-disable react/prop-types */
export const ModalTemplate = forwardRef(({ children, title }, ref) => {
  return (
    <div
      className="w-1/3 h-auto  text-white  z-50 bg-slate-800 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg absolute shadow-lg"
      ref={ref}
    >
      <section className="p-2 border-b-2 flex items-center gap-2">
        <span className="font-bold text-xl ">{title}</span>
      </section>
      {children}
    </div>
  );
});

ModalTemplate.displayName = ModalTemplate;
