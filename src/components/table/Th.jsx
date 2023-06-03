import React from "react";

function Th({ children }) {
  return (
    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
      {children}
    </th>
  );
}

export default Th;
