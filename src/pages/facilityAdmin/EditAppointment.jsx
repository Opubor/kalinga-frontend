import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../services/axios";
import { toast } from "react-toastify";
import InputField from "../../components/InputField.component";
import FacilityAdminLayout from "../../layout/FacilityAdminLayout";
import { loginContext } from "../context/auth";

function EditAppointment() {
  const navigate = useNavigate();
  const { logout, loggedIn, user } = useContext(loginContext);
  const [staffsData, setStaffsData] = useState([]);
  const [patientData, setpatientData] = useState([]);
  const [currentStaff, setCurrentStaff] = useState([]);
  const [currentStaffid, setCurrentStaffId] = useState([]);
  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("edit");
  const [appointment, setAppointment] = useState({
    patientid: `${id}`,
    facilityadminid: `${user?._id}`,
    assignedstaffid: "",
    morningstart: "",
    morningend: "",
    afternoonstart: "",
    afternoonend: "",
    eveningstart: "",
    eveningend: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAppointment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [checkedValues, setCheckedValues] = useState({
    morningsession: "",
    afternoonsession: "",
    eveningsession: "",
  });
  function handleCheckedValues(e) {
    setCheckedValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  }

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

  // To Get Current Details
  useEffect(() => {
    axios.get(`/appointments/?edit=${id}`).then((response) => {
      setAppointment(response?.data);
      setCheckedValues(response?.data);
      setCurrentStaff(response?.data?.assignedstaff[0]?.fullname);
      setCurrentStaffId(response?.data?.assignedstaff[0]?._id);
    });
  }, []);

  // To Update Staff
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/appointment/${id}`, {
        patientid: appointment?.patientid,
        facilityadminid: appointment?.facilityadminid,
        assignedstaffid: appointment?.assignedstaffid,
        morningsession: checkedValues?.morningsession,
        morningstart: appointment?.morningstart,
        morningend: appointment?.morningend,
        afternoonsession: checkedValues?.afternoonsession,
        afternoonstart: appointment?.afternoonstart,
        afternoonend: appointment?.afternoonend,
        eveningsession: checkedValues?.eveningsession,
        eveningstart: appointment?.eveningstart,
        eveningend: appointment?.eveningend,
      })
      .then((res) => {
        navigate("/facilityadmin/appointments", { replace: true }),
          toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <FacilityAdminLayout>
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Edit Appointment
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="border p-2 rounded-md mb-5.5">
                <h1 className="text-lg">Patient: {appointment?.patientname}</h1>
              </div>

              <input type="hidden" name="patientid" onChange={handleChange} />
              <input
                type="hidden"
                name="facilityadminid"
                onChange={handleChange}
              />

              <div className="mb-5.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Assign to
                </label>
                <select
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  name="assignedstaffid"
                  type="text"
                  onChange={handleChange}
                >
                  <option defaultValue={currentStaffid}>{currentStaff}</option>
                  {staffsData.map((staff, i) => {
                    return (
                      <option value={staff?._id} key={i}>
                        {staff?.uniqueid} - {staff?.fullname}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* ==================Morning Session================== */}
              <div className="border px-2 py-4 mb-5.5">
                <InputField
                  className="w-full flex gap-2 itms-center md:w-1/3 px-2 mb-5.5"
                  label="Morning Session"
                  name="morningsession"
                  type="checkbox"
                  onChange={handleCheckedValues}
                  defaultValue={checkedValues?.morningsession}
                />
                <div className="flex flex-col gap-5.5 sm:flex-row">
                  <InputField
                    className="w-full sm:w-1/2"
                    label="From"
                    name="morningstart"
                    type="datetime-local"
                    placeholder="Start Time"
                    onChange={handleChange}
                    defaultValue={appointment?.morningstart}
                  />
                  <InputField
                    className="w-full sm:w-1/2"
                    label="To"
                    name="morningend"
                    id="to"
                    type="datetime-local"
                    placeholder="Stop Time"
                    onChange={handleChange}
                    defaultValue={appointment?.morningend}
                  />
                </div>
              </div>

              {/* ===================Afternoon Session=================== */}
              <div className="border px-2 py-4 mb-5.5">
                <InputField
                  className="w-full flex gap-2 itms-center md:w-1/3 px-2 mb-5.5"
                  label="Afternoon Session"
                  name="afternoonsession"
                  type="checkbox"
                  onChange={handleCheckedValues}
                  defaultValue={checkedValues?.afternoonsession}
                />
                <div className="flex flex-col gap-5.5 sm:flex-row">
                  <InputField
                    className="w-full sm:w-1/2"
                    label="From"
                    name="afternoonstart"
                    type="datetime-local"
                    placeholder="Start Time"
                    onChange={handleChange}
                    defaultValue={appointment?.afternoonstart}
                  />
                  <InputField
                    className="w-full sm:w-1/2"
                    label="To"
                    name="afternoonend"
                    type="datetime-local"
                    placeholder="Stop Time"
                    onChange={handleChange}
                    defaultValue={appointment?.afternoonend}
                  />
                </div>
              </div>
              {/* ==========Evening Session========= */}
              <div className="border px-2 py-4 mb-5.5">
                <InputField
                  className="w-full flex gap-2 itms-center md:w-1/3 px-2 mb-5.5"
                  label="Evening Session"
                  name="eveningsession"
                  type="checkbox"
                  onChange={handleCheckedValues}
                  defaultValue={checkedValues?.eveningsession}
                />
                <div className="flex flex-col gap-5.5 sm:flex-row">
                  <InputField
                    className="w-full sm:w-1/2"
                    label="From"
                    name="eveningstart"
                    type="datetime-local"
                    placeholder="Start Time"
                    onChange={handleChange}
                    defaultValue={appointment?.eveningstart}
                  />
                  <InputField
                    className="w-full sm:w-1/2"
                    label="To"
                    name="eveningend"
                    type="datetime-local"
                    placeholder="Stop Time"
                    onChange={handleChange}
                    defaultValue={appointment?.eveningend}
                  />
                </div>
              </div>

              <div className="mb-6 flex gap-4">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                >
                  Edit Appointment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>{" "}
    </FacilityAdminLayout>
  );
}

export default EditAppointment;
