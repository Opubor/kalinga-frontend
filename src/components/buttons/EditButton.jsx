import React from "react";
import { Link } from "react-router-dom";

function EditButton({ editFunction, children }) {
  return (
    <Link
      className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-4 mr-2"
      to={editFunction}
    >
      {children}
    </Link>
  );
}

export default EditButton;
