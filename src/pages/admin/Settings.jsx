import React, { useContext, useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumb";
import PasswordReset from "../../components/PasswordReset.component";
import InputField from "../../components/InputField.component";
import ButtonPreloader from "../../components/buttons/ButtonPreloader";
import { loginContext } from "../context/auth";
import axios from "../services/axios";
import { toast } from "react-toastify";
import FacilityAdminLayout from "../../layout/FacilityAdminLayout";
import CareGiverLayout from "../../layout/CareGiverLayout";

function Settings() {
  const { logout, loggedIn, user } = useContext(loginContext);
  const admin = user?.role === "admin";
  const facilityadmin = user?.role === "facilityadmin";
  const caregiver = user?.role === "caregiver";

  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
  });

  function handleChange(e) {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const id = user?._id;

  // To Get Current Details
  useEffect(() => {
    axios.get(`/staff/?edit=${id}`).then((response) => {
      setUserData(response.data);
    });
  }, []);

  // To Update Settings
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`/settings/${id}`, {
        fullname: userData?.fullname,
        email: userData?.email,
        phonenumber: userData?.phonenumber,
        street: userData?.street,
        city: userData?.city,
        state: userData?.state,
        zipcode: userData?.zipcode,
      })
      .then(() => {
        setLoading(false), window.location.reload(true), { replace: true };
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
      });
  };

  return (
    <>
      {admin && (
        <DefaultLayout>
          <div className="mx-auto max-w-270">
            <Breadcrumb pageName="Settings" />

            <div className="grid grid-cols-5 gap-8">
              <div className="col-span-5 xl:col-span-3">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Personal Information
                    </h3>
                  </div>
                  <div className="p-7">
                    <form onSubmit={handleSubmit}>
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
                          label="Phone Number"
                          name="phonenumber"
                          type="text"
                          placeholder="Enter Phone-number"
                          onChange={handleChange}
                          defaultValue={userData?.phonenumber}
                        />
                      </div>

                      <InputField
                        className="w-full sm:w-1/2"
                        label="E-mail"
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                        defaultValue={userData?.email}
                      />

                      <InputField
                        label="Street"
                        name="street"
                        type="text"
                        placeholder="123 Main St"
                        onChange={handleChange}
                        defaultValue={userData?.street}
                      />

                      <div className="flex flex-wrap -mx-2 mb-5.5">
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

                      <div className="flex justify-end gap-4.5">
                        <button
                          className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                          type="submit"
                        >
                          {loading ? <ButtonPreloader /> : "Save"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-span-5 xl:col-span-2">
                <PasswordReset />
              </div>
            </div>
          </div>
        </DefaultLayout>
      )}
      {facilityadmin && (
        <FacilityAdminLayout>
          <div className="mx-auto max-w-270">
            <Breadcrumb pageName="Settings" />

            <div className="grid grid-cols-5 gap-8">
              <div className="col-span-5 xl:col-span-3">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Personal Information
                    </h3>
                  </div>
                  <div className="p-7">
                    <form onSubmit={handleSubmit}>
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
                          label="Phone Number"
                          name="phonenumber"
                          type="text"
                          placeholder="Enter Phone-number"
                          onChange={handleChange}
                          defaultValue={userData?.phonenumber}
                        />
                      </div>

                      <InputField
                        className="w-full sm:w-1/2"
                        label="E-mail"
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                        defaultValue={userData?.email}
                      />

                      <InputField
                        label="Street"
                        name="street"
                        type="text"
                        placeholder="123 Main St"
                        onChange={handleChange}
                        defaultValue={userData?.street}
                      />

                      <div className="flex flex-wrap -mx-2 mb-5.5">
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

                      <div className="flex justify-end gap-4.5">
                        <button
                          className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                          type="submit"
                        >
                          {loading ? <ButtonPreloader /> : "Save"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-span-5 xl:col-span-2">
                <PasswordReset />
              </div>
            </div>
          </div>
        </FacilityAdminLayout>
      )}
      {caregiver && (
        <CareGiverLayout>
          <div className="mx-auto max-w-270">
            <Breadcrumb pageName="Settings" />

            <div className="grid grid-cols-5 gap-8">
              <div className="col-span-5 xl:col-span-3">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Personal Information
                    </h3>
                  </div>
                  <div className="p-7">
                    <form onSubmit={handleSubmit}>
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
                          label="Phone Number"
                          name="phonenumber"
                          type="text"
                          placeholder="Enter Phone-number"
                          onChange={handleChange}
                          defaultValue={userData?.phonenumber}
                        />
                      </div>

                      <InputField
                        className="w-full sm:w-1/2"
                        label="E-mail"
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                        defaultValue={userData?.email}
                      />

                      <InputField
                        label="Street"
                        name="street"
                        type="text"
                        placeholder="123 Main St"
                        onChange={handleChange}
                        defaultValue={userData?.street}
                      />

                      <div className="flex flex-wrap -mx-2 mb-5.5">
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

                      <div className="flex justify-end gap-4.5">
                        <button
                          className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                          type="submit"
                        >
                          {loading ? <ButtonPreloader /> : "Save"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-span-5 xl:col-span-2">
                <PasswordReset />
              </div>
            </div>
          </div>
        </CareGiverLayout>
      )}
    </>
  );
}

export default Settings;
