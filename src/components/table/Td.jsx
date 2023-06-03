import React from "react";

function Td({ children, ...rest }) {
  return (
    <td
      className="border-b border-[#eee] px-4 dark:border-strokedark py-2"
      {...rest}
    >
      {children}
    </td>
  );
}

export default Td;
