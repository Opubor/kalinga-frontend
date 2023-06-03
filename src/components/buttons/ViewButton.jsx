import React from "react";
import { Link } from "react-router-dom";

function ViewButton({ viewFunction, style, children, ...rest }) {
  return (
    <Link
      className="inline-flex items-center justify-center rounded-md bg-success py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-4 mr-2"
      to={viewFunction}
      {...rest}
    >
      {children}
    </Link>
  );
}

export default ViewButton;
