import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import axios from "../services/axios";
import { toast } from "react-toastify";
import InputField from "../../components/InputField.component";

function EditFacility() {
  const navigate = useNavigate();
  const [facilityAdmins, setFacilityAdmins] = useState([]);
  const [currentStaff, setCurrentStaff] = useState([]);

  const [facilityData, setFacilityData] = useState({
    name: "",
    phonenumber: "",
    staffid: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFacilityData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("edit");

  // To Get Current Details
  useEffect(() => {
    axios.get(`/facility/?edit=${id}`).then((response) => {
      setFacilityData(response.data);
      setCurrentStaff(response.data?.staff[0]?.fullname);
    });
  }, []);

  // To Update Staff
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/facility/${id}`, {
        name: facilityData?.name,
        phonenumber: facilityData?.phonenumber,
        staffid: facilityData?.staffid,
        street: facilityData?.street,
        city: facilityData?.city,
        state: facilityData?.state,
        zipcode: facilityData?.zipcode,
      })
      .then((res) => {
        navigate("/admin/facilities", { replace: true }),
          toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  // Get Facility Admins =========================================
  function getFacilityAdmins() {
    axios
      .get("/staff")
      .then((response) => {
        setFacilityAdmins(response?.data);
      })
      .catch((response) => {
        console.log(response.data);
      });
  }
  // UseEffect ============================================
  useEffect(() => {
    getFacilityAdmins();
  }, []);

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit}>
        <div className="p-6.5">
          <div className="flex flex-col gap-5.5 sm:flex-row">
            <InputField
              className="w-full sm:w-1/2"
              label="Name"
              name="name"
              type="text"
              onChange={handleChange}
              defaultValue={facilityData?.name}
            />
            <InputField
              className="w-full sm:w-1/2"
              label="Phone Number"
              name="phonenumber"
              type="text"
              onChange={handleChange}
              defaultValue={facilityData.phonenumber}
            />
            {/* <PhoneInputField
                className="w-full sm:w-1/2"
                label="Phone Number"
                name="phonenumber"
                id="phoneNumber"
                onChange={handleChange}
                value={facilityData.phonenumber}
              /> */}
          </div>

          <div className="mb-5.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Facility Admin
            </label>
            <select
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              name="staffid"
              type="number"
              onChange={handleChange}
            >
              <option defaultValue={facilityData?.staffid}>
                {currentStaff}
              </option>
              {facilityAdmins.map((staff, i) => {
                return (
                  <option value={staff?._id} key={i}>
                    {staff?.uniqueid} - {staff?.fullname}
                  </option>
                );
              })}
            </select>
          </div>

          <InputField
            label="Street"
            name="street"
            type="text"
            onChange={handleChange}
            defaultValue={facilityData?.street}
          />

          <div className="flex flex-wrap -mx-2 mb-5.5">
            <InputField
              className="w-full md:w-1/2 px-2 mb-5.5"
              label="City"
              name="city"
              type="text"
              onChange={handleChange}
              defaultValue={facilityData?.city}
            />
            <InputField
              className="w-full md:w-1/4 px-2 mb-5.5"
              label="State"
              name="state"
              type="text"
              onChange={handleChange}
              defaultValue={facilityData?.state}
            />
            <InputField
              className="w-full md:w-1/4 px-2 mb-5.5"
              label="Zipcode"
              name="zipcode"
              type="text"
              onChange={handleChange}
              defaultValue={facilityData?.zipcode}
            />
          </div>

          <div className="mb-6 flex gap-4">
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
            >
              Edit Facility
            </button>
          </div>
        </div>
      </form>
    </DefaultLayout>
  );
}

export default EditFacility;
