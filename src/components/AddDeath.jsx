import React, { useContext, useEffect, useState } from "react";
import InputField from "../components/InputField.component";
import axios from "../pages/services/axios";
import { toast } from "react-toastify";
import { loginContext } from "../pages/context/auth";
import ButtonPreloader from "./buttons/ButtonPreloader";

function AddDeath() {
  const { logout, loggedIn, user } = useContext(loginContext);
  const [patientsData, setPatientsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [deathData, setDeathData] = useState({
    reportname: "",
    reporttype: "death",
    reporttext: "",
    staffid: `${user?._id}`,
    patientid: "",
    date: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDeathData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission====================================
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("/report", {
        reportname: deathData?.reportname,
        reporttype: deathData?.reporttype,
        reporttext: deathData?.reporttext,
        staffid: deathData?.staffid,
        patientid: deathData?.patientid,
        date: deathData?.date,
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

  // UseEffect ============================================
  useEffect(() => {
    getPatients();
  }, []);

  return (
    <>
      {/* =====================Add Death Form====================== */}
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Add Death Report
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <InputField
                label="Report Name"
                name="reportname"
                id="name"
                type="text"
                placeholder="Report name"
                onChange={handleChange}
                value={deathData.reportname}
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
                    value={deathData.reporttext}
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
                  <option>Select Patient</option>
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
                value={deathData.date}
              />

              <div className="mb-6 flex gap-4">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                >
                  {loading ? <ButtonPreloader /> : "Report Death"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddDeath;
