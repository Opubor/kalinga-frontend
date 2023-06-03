import React from "react";

function TablesLayout({ tableName, search, pagination, children }) {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="max-w-full overflow-x-auto p-2">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            {tableName}
          </h3>
        </div>
        <div className="flex justify-between items-center">
          {search}
          <div className="items-center flex flex-col lg:flex-row">
            {pagination}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default TablesLayout;
