import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InputField from "../../components/InputField.component";
import FacilityAdminLayout from "../../layout/FacilityAdminLayout";
import { loginContext } from "../context/auth";
import axios from "../../pages/services/axios";

function AddAppointment() {
  const { logout, loggedIn, user } = useContext(loginContext);
  const [staffsData, setStaffsData] = useState([]);

  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("appointment");

  let staffid = user?._id;
  let role = user?.role;
  function getStaffs() {
    axios
      .get(`/staff?staffid=${staffid}&role=${role}`)
      .then((response) => {
        setStaffsData(response?.data);
      })
      .catch((response) => {
        console.log(response.data);
      });
  }

  useEffect(() => {
    getStaffs();
  }, []);

  return (
    <FacilityAdminLayout>
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Add Appointment
            </h3>
          </div>
          <form>
            <div className="p-6.5">
              <InputField
                label="Report Name"
                name="reportname"
                id="name"
                type="text"
                placeholder="Report name"
              />

              <div className="mb-5.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Assign to
                </label>
                <select
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  name="assignedstaff"
                  type="text"
                  //   onChange={handleChange}
                >
                  <option>Select Staff</option>
                  {staffsData.map((staff, i) => {
                    return (
                      <option value={staff?._id} key={i}>
                        {staff?.uniqueid} - {staff?.fullname}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="mb-6 flex gap-4">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                >
                  Add Appointment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </FacilityAdminLayout>
  );
}

export default AddAppointment;
