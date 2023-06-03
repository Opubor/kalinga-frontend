import React, { useContext, useEffect, useState } from "react";
import Tab from "../../components/Tab.component";
import AddIncident from "../../components/AddIncident";
import IncidentTable from "../../components/IncidentTable";
import FacilityAdminLayout from "../../layout/FacilityAdminLayout";

function Incidents() {
  return (
    <FacilityAdminLayout>
      <Tab
        addTag={"Add Incident"}
        addDisplay={<AddIncident />}
        viewTag={"Incidents"}
        viewDisplay={<IncidentTable />}
      />
    </FacilityAdminLayout>
  );
}

export default Incidents;
