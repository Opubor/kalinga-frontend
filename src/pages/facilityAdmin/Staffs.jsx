import React, { useEffect } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import StaffTable from "../../components/StaffTable";
import AddStaff from "../../components/AddStaff.component";
import StaffTab from "../../components/Tab.component";
import FacilityAdminLayout from "../../layout/FacilityAdminLayout";

function Staffs() {
  return (
    <FacilityAdminLayout>
      <div className="flex flex-col gap-4">
        <StaffTab
          viewTag={"Staffs"}
          viewDisplay={<StaffTable />}
          addTag={"Add Staffs"}
          addDisplay={<AddStaff />}
        />
        <p></p>
      </div>
    </FacilityAdminLayout>
  );
}

export default Staffs;
