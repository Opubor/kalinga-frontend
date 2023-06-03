import React, { useContext, useEffect, useState } from "react";
import InputField from "./InputField.component";
import PhoneInputField from "./PhoneInputField.component";
import axios from "../pages/services/axios";
import { toast } from "react-toastify";
import ButtonPreloader from "./buttons/ButtonPreloader";
import { loginContext } from "../pages/context/auth";

const AddFacility = () => {
  const { logout, loggedIn, user } = useContext(loginContext);

  const [loading, setLoading] = useState(false);
  const [facilityAdmins, setFacilityAdmins] = useState([]);
  const [facilityData, setFacilityData] = useState({
    name: "",
    phonenumber: "",
    staffid: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFacilityData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/facility", {
        name: facilityData?.name,
        phonenumber: facilityData?.phonenumber,
        staffid: facilityData?.staffid,
        street: facilityData?.street,
        city: facilityData?.city,
        state: facilityData?.state,
        zipcode: facilityData?.zipcode,
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
  let id = user?._id;
  let role = user?.role;
  // Get Facility Admins =========================================
  function getFacilityAdmins() {
    axios
      .get(`/staff?staffid=${id}&role=${role}`)
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
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Add Facility
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <div className="flex flex-col gap-5.5 sm:flex-row">
              <InputField
                className="w-full sm:w-1/2"
                label="Name"
                name="name"
                id="name"
                type="text"
                placeholder="Enter Facility Name"
                onChange={handleChange}
                value={facilityData?.name}
              />
              <InputField
                className="w-full sm:w-1/2"
                label="Phone Number"
                name="phonenumber"
                id="phoneNumber"
                type="text"
                placeholder="Enter your Phone-number"
                onChange={handleChange}
                value={facilityData?.phonenumber}
              />
              {/* <PhoneInputField
                className="w-full sm:w-1/2"
                label="Phone Number"
                name="phonenumber"
                id="phoneNumber"
                onChange={handleChange}
                value={facilityData?.phonenumber}
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
                <option>Select Admin</option>
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
              id="street"
              type="text"
              placeholder="123 Main St"
              onChange={handleChange}
              value={facilityData?.street}
            />

            <div className="flex flex-wrap -mx-2 mb-5.5">
              <InputField
                className="w-full md:w-1/2 px-2 mb-5.5"
                label="City"
                name="city"
                id="city"
                type="text"
                placeholder="New York"
                onChange={handleChange}
                value={facilityData?.city}
              />
              <InputField
                className="w-full md:w-1/4 px-2 mb-5.5"
                label="State"
                name="state"
                id="state"
                type="text"
                placeholder="NY"
                onChange={handleChange}
                value={facilityData?.state}
              />
              <InputField
                className="w-full md:w-1/4 px-2 mb-5.5"
                label="Zipcode"
                name="zipcode"
                id="zipcode"
                type="text"
                placeholder="10001"
                onChange={handleChange}
                value={facilityData?.zipcode}
              />
            </div>

            <div className="mb-6 flex gap-4">
              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
              >
                {loading ? <ButtonPreloader /> : "Create Facility"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFacility;
