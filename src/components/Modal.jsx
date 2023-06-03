import React from "react";

function Modal({ children, styles, closeModalFunction, formName }) {
  return (
    <div
      className={`w-full h-screen fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-70 ${styles}`}
    >
      <div className="flex flex-col text-black bg-white p-12 rounded-lg">
        <div className="flex items-center gap-2 mb-5.5">
          <button className="font-bold" onClick={closeModalFunction}>
            {`<=`}
          </button>
          <h1 className="text-black text-2xl font-bold">{formName}</h1>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
