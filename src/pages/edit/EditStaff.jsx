import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import axios from "../services/axios";
import { toast } from "react-toastify";
import InputField from "../../components/InputField.component";
import { loginContext } from "../context/auth";
import FacilityAdminLayout from "../../layout/FacilityAdminLayout";

function EditStaff() {
  const navigate = useNavigate();
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
  });

  function handleChange(e) {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("edit");

  // To Get Current Details
  useEffect(() => {
    axios.get(`/staff/?edit=${id}`).then((response) => {
      setUserData(response.data);
    });
  }, []);

  // To Update Staff
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/staff/${id}`, {
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
      })
      .then((res) => {
        if (admin) {
          navigate("/admin/staffs", { replace: true }), toast.success(res.data);
        }
        if (facilityadmin) {
          navigate("/facilityadmin/staffs", { replace: true }),
            toast.success(res.data);
        }
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <>
      {admin && (
        <DefaultLayout>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="flex flex-col gap-5.5 sm:flex-row">
                <InputField
                  className="w-full sm:w-1/2"
                  label="Name"
                  name="fullname"
                  type="text"
                  defaultValue={userData?.fullname}
                  onChange={handleChange}
                />
                <InputField
                  className="w-full sm:w-1/2"
                  label="E-mail"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                  defaultValue={userData?.email}
                />
              </div>

              <div className="flex flex-col gap-5.5 sm:flex-row">
                <InputField
                  className="w-full sm:w-1/2"
                  label="Phone Number"
                  name="phonenumber"
                  type="text"
                  placeholder="Enter Phone-number"
                  onChange={handleChange}
                  defaultValue={userData?.phonenumber}
                />
                <InputField
                  className="w-full sm:w-1/2"
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  placeholder="123 Main St"
                  onChange={handleChange}
                  defaultValue={userData?.dob}
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
                    defaultValue={userData?.password}
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
                    <option defaultValue={userData?.role}>
                      {userData?.role}
                    </option>
                    <option value="caregiver">Caregiver</option>
                    <option value="facilityadmin">Facility Admin</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <InputField
                label="Street"
                name="street"
                type="text"
                placeholder="123 Main St"
                onChange={handleChange}
                defaultValue={userData?.street}
              />

              <div className="flex flex-wrap -mx-2">
                <InputField
                  className="w-full md:w-1/2 px-2 mb-5.5"
                  label="City"
                  name="city"
                  type="text"
                  placeholder="New York"
                  onChange={handleChange}
                  defaultValue={userData?.city}
                />
                <InputField
                  className="w-full md:w-1/4 px-2 mb-5.5"
                  label="State"
                  name="state"
                  type="text"
                  placeholder="NY"
                  onChange={handleChange}
                  defaultValue={userData?.state}
                />
                <InputField
                  className="w-full md:w-1/4 px-2 mb-5.5"
                  label="Zipcode"
                  name="zipcode"
                  type="text"
                  placeholder="10001"
                  onChange={handleChange}
                  defaultValue={userData?.zipcode}
                />
              </div>

              <div className="mb-6 flex gap-4">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                >
                  Edit Staff
                </button>
              </div>
            </div>
          </form>
        </DefaultLayout>
      )}
      {facilityadmin && (
        <FacilityAdminLayout>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="flex flex-col gap-5.5 sm:flex-row">
                <InputField
                  className="w-full sm:w-1/2"
                  label="Name"
                  name="fullname"
                  type="text"
                  defaultValue={userData?.fullname}
                  onChange={handleChange}
                />
                <InputField
                  className="w-full sm:w-1/2"
                  label="E-mail"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                  defaultValue={userData?.email}
                />
              </div>

              <div className="flex flex-col gap-5.5 sm:flex-row">
                <InputField
                  className="w-full sm:w-1/2"
                  label="Phone Number"
                  name="phonenumber"
                  type="text"
                  placeholder="Enter Phone-number"
                  onChange={handleChange}
                  defaultValue={userData?.phonenumber}
                />
                <InputField
                  className="w-full sm:w-1/2"
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  placeholder="123 Main St"
                  onChange={handleChange}
                  defaultValue={userData?.dob}
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
                    defaultValue={userData?.password}
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
                    <option defaultValue={userData?.role}>
                      {userData?.role}
                    </option>
                    <option value="caregiver">Caregiver</option>
                    <option value="facilityadmin">Facility Admin</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <InputField
                label="Street"
                name="street"
                type="text"
                placeholder="123 Main St"
                onChange={handleChange}
                defaultValue={userData?.street}
              />

              <div className="flex flex-wrap -mx-2">
                <InputField
                  className="w-full md:w-1/2 px-2 mb-5.5"
                  label="City"
                  name="city"
                  type="text"
                  placeholder="New York"
                  onChange={handleChange}
                  defaultValue={userData?.city}
                />
                <InputField
                  className="w-full md:w-1/4 px-2 mb-5.5"
                  label="State"
                  name="state"
                  type="text"
                  placeholder="NY"
                  onChange={handleChange}
                  defaultValue={userData?.state}
                />
                <InputField
                  className="w-full md:w-1/4 px-2 mb-5.5"
                  label="Zipcode"
                  name="zipcode"
                  type="text"
                  placeholder="10001"
                  onChange={handleChange}
                  defaultValue={userData?.zipcode}
                />
              </div>

              <div className="mb-6 flex gap-4">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                >
                  Edit Staff
                </button>
              </div>
            </div>
          </form>
        </FacilityAdminLayout>
      )}
    </>
  );
}

export default EditStaff;
