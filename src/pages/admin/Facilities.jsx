import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import FacilityTable from "../../components/FacilityTable";
import AddFacility from "../../components/AddFacility";
import Tab from "../../components/Tab.component";

function Facilities() {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-4">
        <Tab
          viewTag={"Facilities"}
          viewDisplay={<FacilityTable />}
          addTag={"Add Facility"}
          addDisplay={<AddFacility />}
        />
      </div>
    </DefaultLayout>
  );
}

export default Facilities;
