import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import axios from "../services/axios";
import { toast } from "react-toastify";
import InputField from "../../components/InputField.component";
import { loginContext } from "../context/auth";
import FacilityAdminLayout from "../../layout/FacilityAdminLayout";
import CareGiverLayout from "../../layout/CareGiverLayout";

function EditIncident() {
  const navigate = useNavigate();
  const { logout, loggedIn, user } = useContext(loginContext);
  const admin = user?.role === "admin";
  const facilityadmin = user?.role === "facilityadmin";
  const caregiver = user?.role === "caregiver";

  const [patientsData, setPatientsData] = useState([]);
  const [currentPatient, setCurrentPatient] = useState([]);

  const [incidentData, setIncidentData] = useState({
    reportname: "",
    reporttype: "incident",
    reporttext: "",
    staffid: `${user?._id}`,
    patientid: "",
    date: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIncidentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // Get Patients =========================================
  function getPatients() {
    axios
      .get("/patients")
      .then((response) => {
        setPatientsData(response?.data);
      })
      .catch((response) => {
        console.log(response.data);
      });
  }

  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("edit");

  // To Get Current Details
  useEffect(() => {
    axios.get(`/reports/?edit=${id}`).then((response) => {
      setIncidentData(response.data);
      setCurrentPatient(response.data?.patients[0]?.fullname);
    });
    getPatients();
  }, []);

  // To Update
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/report/${id}`, {
        reportname: incidentData?.reportname,
        reporttype: incidentData?.reporttype,
        reporttext: incidentData?.reporttext,
        staffid: incidentData?.staffid,
        patientid: incidentData?.patientid,
        date: incidentData?.date,
      })
      .then((res) => {
        navigate("/admin/incident-reports", { replace: true }),
          toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <>
      {facilityadmin && (
        <FacilityAdminLayout>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <InputField
                label="Report Name"
                name="reportname"
                id="name"
                type="text"
                placeholder="Report name"
                onChange={handleChange}
                defaultValue={incidentData.reportname}
              />

              <input type="hidden" name="reporttype" onChange={handleChange} />

              <div className="flex flex-col gap-5.5 sm:flex-row mb-5.5">
                <div className="w-full">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Report Text
                  </label>
                  <textarea
                    name="reporttext"
                    onChange={handleChange}
                    defaultValue={incidentData.reporttext}
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>
              </div>

              <input type="hidden" onChange={handleChange} name="staffid" />

              <div className="mb-5.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Patient Name
                </label>
                <select
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  name="patientid"
                  type="number"
                  onChange={handleChange}
                >
                  <option defaultValue={incidentData?.patientid}>
                    {currentPatient}
                  </option>
                  {patientsData.map((patient, i) => {
                    return (
                      <option value={patient?._id} key={i}>
                        {patient?.uniqueid} - {patient?.fullname}
                      </option>
                    );
                  })}
                </select>
              </div>

              <InputField
                label="Date"
                name="date"
                id="date"
                type="date"
                placeholder="New York"
                onChange={handleChange}
                defaultValue={incidentData.date}
              />

              <div className="mb-6 flex gap-4">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                >
                  Edit Incident
                </button>
              </div>
            </div>
          </form>
        </FacilityAdminLayout>
      )}
    </>
  );
}

export default EditIncident;
