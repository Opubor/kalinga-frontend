import React, { useContext, useEffect, useState } from "react";
import InputField from "./InputField.component";
import axios from "../pages/services/axios";
import { toast } from "react-toastify";
import ButtonPreloader from "./buttons/ButtonPreloader";
import { loginContext } from "../pages/context/auth";

const AddStaff = () => {
  const { logout, loggedIn, user } = useContext(loginContext);
  const admin = user?.role === "admin";
  const facilityadmin = user?.role === "facilityadmin";
  const caregiver = user?.role === "caregiver";

  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    dob: "",
    password: "",
    role: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    facilityadminid: `${user?._id}`,
    facilityname: `${user?.facilityname}`,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("/staff", {
        fullname: userData?.fullname,
        email: userData?.email,
        phonenumber: userData?.phonenumber,
        dob: userData?.dob,
        password: userData?.password,
        role: userData?.role,
        street: userData?.street,
        city: userData?.city,
        state: userData?.state,
        zipcode: userData?.zipcode,
        facilityadminid: userData?.facilityadminid,
        facilityname: userData?.facilityname,
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
    <div className="flex flex-col gap-9">
      {/* Add Staff Form */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Add Staff</h3>
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
                placeholder="Enter Staff Name"
                onChange={handleChange}
                value={userData.name}
              />
              <InputField
                className="w-full sm:w-1/2"
                label="E-mail"
                name="email"
                id="email"
                type="email"
                placeholder="Enter email"
                onChange={handleChange}
                value={userData.email}
              />
            </div>

            <div className="flex flex-col gap-5.5 sm:flex-row">
              <InputField
                className="w-full sm:w-1/2"
                label="Phone Number"
                name="phonenumber"
                id="phoneNumber"
                type="text"
                placeholder="Enter Phone-number"
                onChange={handleChange}
                value={userData.phonenumber}
              />
              <InputField
                className="w-full sm:w-1/2"
                label="Date of Birth"
                name="dob"
                id="dob"
                type="date"
                placeholder="123 Main St"
                onChange={handleChange}
                value={userData.dob}
              />
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  onChange={handleChange}
                  value={userData.password}
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Role
                </label>
                <select
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  name="role"
                  onChange={handleChange}
                >
                  <option value="">Select a role</option>
                  {admin && (
                    <>
                      <option value="facilityadmin">Facility Admin</option>
                      <option value="admin">Admin</option>
                    </>
                  )}
                  {facilityadmin && (
                    <option value="caregiver">Caregiver</option>
                  )}
                </select>
              </div>
            </div>
            {/* Address form implementation goes here */}
            <InputField
              label="Street"
              name="street"
              id="street"
              type="text"
              placeholder="123 Main St"
              onChange={handleChange}
              value={userData.street}
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
                value={userData.city}
              />
              <InputField
                className="w-full md:w-1/4 px-2 mb-5.5"
                label="State"
                name="state"
                id="state"
                type="text"
                placeholder="NY"
                onChange={handleChange}
                value={userData.state}
              />
              <InputField
                className="w-full md:w-1/4 px-2 mb-5.5"
                label="Zipcode"
                name="zipcode"
                id="zipcode"
                type="text"
                placeholder="10001"
                onChange={handleChange}
                value={userData.zipcode}
              />
            </div>

            {facilityadmin && (
              <>
                <input
                  type="hidden"
                  name="facilityname"
                  onChange={handleChange}
                />
                <input
                  type="hidden"
                  name="facilityadminid"
                  onChange={handleChange}
                />
              </>
            )}

            <div className="mb-6 flex gap-4">
              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
              >
                {loading ? <ButtonPreloader /> : "Create Staff"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddStaff;
