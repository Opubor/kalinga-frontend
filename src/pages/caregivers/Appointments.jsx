import React from "react";
import AppointmentsTable from "../../components/AppointmentsTable";
import CareGiverLayout from "../../layout/CareGiverLayout";

function Appointments() {
  return (
    <CareGiverLayout>
      <AppointmentsTable />
    </CareGiverLayout>
  );
}

export default Appointments;
