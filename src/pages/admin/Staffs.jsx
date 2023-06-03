import React, { useEffect } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import StaffTable from "../../components/StaffTable";
import AddStaff from "../../components/AddStaff.component";
import StaffTab from "../../components/Tab.component";

function Staffs() {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-4">
        <StaffTab
          viewTag={"Staffs"}
          viewDisplay={<StaffTable />}
          addTag={"Add Staffs"}
          addDisplay={<AddStaff />}
        />
        <p></p>
      </div>
    </DefaultLayout>
  );
}

export default Staffs;
