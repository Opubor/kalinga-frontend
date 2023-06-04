import React from "react";
import AppointmentsTable from "../../components/AppointmentsTable";
import FacilityAdminLayout from "../../layout/FacilityAdminLayout";

function Appointments() {
  return (
    <FacilityAdminLayout>
      <AppointmentsTable />
    </FacilityAdminLayout>
  );
}

export default Appointments;
