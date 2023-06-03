import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import axios from "../services/axios";
import { toast } from "react-toastify";
import InputField from "../../components/InputField.component";
import FacilityAdminLayout from "../../layout/FacilityAdminLayout";

function EditPatient() {
  const navigate = useNavigate();

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
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setpatientData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("edit");

  // To Get Current Details
  useEffect(() => {
    axios.get(`/patients/?edit=${id}`).then((response) => {
      setpatientData(response.data);
    });
  }, []);

  // To Update Staff
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/patient/${id}`, {
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
        navigate("/admin/patients", { replace: true }), toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <FacilityAdminLayout>
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
              defaultValue={patientData?.fullname}
            />
            <InputField
              className="w-full sm:w-1/2"
              label="Phone Number"
              name="phonenumber"
              id="phoneNumber"
              type="text"
              placeholder="Enter Phone-number"
              onChange={handleChange}
              defaultValue={patientData?.phonenumber}
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
              defaultValue={patientData?.email}
            />
            <InputField
              className="w-full sm:w-1/2"
              label="Date of Birth"
              name="dob"
              id="dob"
              type="date"
              placeholder="123 Main St"
              onChange={handleChange}
              defaultValue={patientData?.dob}
            />
          </div>

          <InputField
            label="Street"
            name="street"
            id="street"
            type="text"
            placeholder="123 Main St"
            onChange={handleChange}
            defaultValue={patientData?.street}
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
              defaultValue={patientData?.city}
            />
            <InputField
              className="w-full md:w-1/4 px-2 mb-5.5"
              label="State"
              name="state"
              id="state"
              type="text"
              placeholder="NY"
              onChange={handleChange}
              value={patientData?.state}
            />
            <InputField
              className="w-full md:w-1/4 px-2 mb-5.5"
              label="Zipcode"
              name="zipcode"
              id="zipcode"
              type="text"
              placeholder="10001"
              onChange={handleChange}
              defaultValue={patientData?.zipcode}
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
                defaultValue={patientData?.medications}
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
                defaultValue={patientData?.ailment}
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
                defaultValue={patientData?.note}
                className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>
          </div>

          <div className="mb-6 flex gap-4">
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
            >
              Edit Patient
            </button>
          </div>
        </div>
      </form>
    </FacilityAdminLayout>
  );
}

export default EditPatient;
