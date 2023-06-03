import React from "react";
import { BiDownArrow } from "react-icons/bi";
import { BiUpArrow } from "react-icons/bi";

function SortTd({ name, sortAsc, sortDsc }) {
  return (
    <td className="flex justify-center items-center gap-16 min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
      {name}
      <div className="flex-col justify-center items-center">
        <div>
          <button onClick={sortAsc}>
            {React.createElement(BiUpArrow, {
              size: "10",
            })}
          </button>
        </div>
        <div>
          <button onClick={sortDsc}>
            {React.createElement(BiDownArrow, { size: "10" })}
          </button>
        </div>
      </div>
    </td>
  );
}

export default SortTd;
