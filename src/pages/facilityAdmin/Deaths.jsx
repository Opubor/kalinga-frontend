import React, { useContext, useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Tab from "../../components/Tab.component";
import DeathTable from "../../components/DeathTable";
import AddDeath from "../../components/AddDeath";
import FacilityAdminLayout from "../../layout/FacilityAdminLayout";

function Deaths() {
  return (
    <FacilityAdminLayout>
      <Tab
        viewDisplay={<DeathTable />}
        viewTag={"Deaths"}
        addTag={"Add Death"}
        addDisplay={<AddDeath />}
      />
    </FacilityAdminLayout>
  );
}

export default Deaths;
