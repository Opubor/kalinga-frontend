import React from "react";

function Thead({ children }) {
  return (
    <thead>
      <tr className="bg-gray-2 text-left dark:bg-meta-4">{children}</tr>
    </thead>
  );
}

export default Thead;
