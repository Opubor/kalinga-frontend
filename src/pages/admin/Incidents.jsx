import React, { useContext, useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Tab from "../../components/Tab.component";
import AddIncident from "../../components/AddIncident";
import IncidentTable from "../../components/IncidentTable";

function Incidents() {
  return (
    <DefaultLayout>
      <IncidentTable />
      {/* <Tab
        addTag={"Add Incident"}
        addDisplay={<AddIncident />}
        viewTag={"Incidents"}
        viewDisplay={<IncidentTable />}
      /> */}
    </DefaultLayout>
  );
}

export default Incidents;
