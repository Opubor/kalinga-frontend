import React from "react";
import AppointmentsTable from "../../components/AppointmentsTable";
import DefaultLayout from "../../layout/DefaultLayout";

function Appointments() {
  return (
    <DefaultLayout>
      <AppointmentsTable />
    </DefaultLayout>
  );
}

export default Appointments;
