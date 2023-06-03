import React from "react";

function Table({ children, mapFunction }) {
  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full table-auto">
        {children}
        {mapFunction}
      </table>
    </div>
  );
}

export default Table;
