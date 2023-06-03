import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import PatientTab from "../../components/Tab.component";
import AddFacility from "../../components/AddFacility";
import InputField from "../../components/InputField.component";
import axios from "../services/axios";
import { toast } from "react-toastify";
import PatientTable from "../../components/PatientTable";
import ButtonPreloader from "../../components/buttons/ButtonPreloader";
import FacilityAdminLayout from "../../layout/FacilityAdminLayout";
import CareGiverLayout from "../../layout/CareGiverLayout";
function Patients() {
  const [loading, setLoading] = useState(false);
  const [patientData, setpatientData] = useState({
    fullname: "",
    phonenumber: "",
    email: "",
    dob: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    medications: "",
    ailment: "",
    note: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setpatientData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/patient", {
        fullname: patientData?.fullname,
        phonenumber: patientData?.phonenumber,
        email: patientData?.email,
        dob: patientData?.dob,
        street: patientData?.street,
        city: patientData?.city,
        state: patientData?.state,
        zipcode: patientData?.zipcode,
        medications: patientData?.medications,
        ailment: patientData?.ailment,
        note: patientData?.note,
      })
      .then((res) => {
        toast.success(res.data);
        setLoading(false);
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err.response.data);
        setLoading(false);
      });
  };

  return (
    <CareGiverLayout>
      <PatientTab
        viewTag={"Patients"}
        addTag={"Add Patient"}
        viewDisplay={<PatientTable />}
        addDisplay={
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Add Patient
                </h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="p-6.5">
                  <div className="flex flex-col gap-5.5 sm:flex-row">
                    <InputField
                      className="w-full sm:w-1/2"
                      label="Name"
                      name="fullname"
                      id="name"
                      type="text"
                      placeholder="Enter Patient Name"
                      onChange={handleChange}
                      value={patientData.name}
                    />
                    <InputField
                      className="w-full sm:w-1/2"
                      label="Phone Number"
                      name="phonenumber"
                      id="phoneNumber"
                      type="text"
                      placeholder="Enter Phone-number"
                      onChange={handleChange}
                      value={patientData.phonenumber}
                    />
                  </div>

                  <div className="flex flex-col gap-5.5 sm:flex-row">
                    <InputField
                      className="w-full sm:w-1/2"
                      label="E-mail"
                      name="email"
                      id="email"
                      type="email"
                      placeholder="Enter email"
                      onChange={handleChange}
                      value={patientData.email}
                    />
                    <InputField
                      className="w-full sm:w-1/2"
                      label="Date of Birth"
                      name="dob"
                      id="dob"
                      type="date"
                      placeholder="123 Main St"
                      onChange={handleChange}
                      value={patientData.dob}
                    />
                  </div>

                  <InputField
                    label="Street"
                    name="street"
                    id="street"
                    type="text"
                    placeholder="123 Main St"
                    onChange={handleChange}
                    value={patientData.street}
                  />

                  <div className="flex flex-wrap -mx-2">
                    <InputField
                      className="w-full md:w-1/2 px-2 mb-5.5"
                      label="City"
                      name="city"
                      id="city"
                      type="text"
                      placeholder="New York"
                      onChange={handleChange}
                      value={patientData.city}
                    />
                    <InputField
                      className="w-full md:w-1/4 px-2 mb-5.5"
                      label="State"
                      name="state"
                      id="state"
                      type="text"
                      placeholder="NY"
                      onChange={handleChange}
                      value={patientData.state}
                    />
                    <InputField
                      className="w-full md:w-1/4 px-2 mb-5.5"
                      label="Zipcode"
                      name="zipcode"
                      id="zipcode"
                      type="text"
                      placeholder="10001"
                      onChange={handleChange}
                      value={patientData.zipcode}
                    />
                  </div>

                  <div className="flex flex-col gap-5.5 sm:flex-row mb-5.5">
                    <div className="w-full">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Medications
                      </label>
                      <textarea
                        name="medications"
                        onChange={handleChange}
                        value={patientData.medications}
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5.5 sm:flex-row mb-5.5">
                    <div className="w-full">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Ailment if any
                      </label>
                      <textarea
                        name="ailment"
                        onChange={handleChange}
                        value={patientData.ailment}
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5.5 sm:flex-row mb-5.5">
                    <div className="w-full">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Note
                      </label>
                      <textarea
                        name="note"
                        onChange={handleChange}
                        value={patientData.note}
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      ></textarea>
                    </div>
                  </div>

                  <div className="mb-6 flex gap-4">
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                    >
                      {loading ? <ButtonPreloader /> : "Create Patient"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        }
      />
    </CareGiverLayout>
  );
}

export default Patients;
