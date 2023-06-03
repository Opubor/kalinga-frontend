import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import PatientTab from "../../components/Tab.component";
import AddFacility from "../../components/AddFacility";
import InputField from "../../components/InputField.component";
import axios from "../services/axios";
import { toast } from "react-toastify";
import PatientTable from "../../components/PatientTable";
import ButtonPreloader from "../../components/buttons/ButtonPreloader";

function Patients() {
  return (
    <DefaultLayout>
      <PatientTable />
    </DefaultLayout>
  );
}

export default Patients;
