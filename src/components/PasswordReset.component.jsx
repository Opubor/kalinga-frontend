import React, { useContext, useState } from "react";
import { BsShieldLock } from "react-icons/bs";
import axios from "../pages/services/axios";
import { toast } from "react-toastify";
import { loginContext } from "../pages/context/auth";

const InputField = ({
  label,
  name,
  id,
  type,
  placeholder,
  defaultValue,
  icon,
  className,
  onChange,
}) => (
  <div className={`mb-5.5 ${className}`}>
    <label
      className="mb-3 block text-sm font-medium text-black dark:text-white"
      htmlFor={id}
    >
      {label}
    </label>
    <div className="relative">
      {icon && <span className="absolute left-4.5 top-4">{icon}</span>}
      <input
        className={`w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${
          icon ? "pl-11.5" : "px-4.5"
        }`}
        type={type}
        name={name}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  </div>
);

const PasswordReset = () => {
  const { logout, loggedIn, user } = useContext(loginContext);
  const [formData, setFormData] = useState({
    oldpassword: "",
    newpassword: "",
    confirmnewpassword: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const id = user?._id;

  // updatePassword
  const updatePassword = (e) => {
    e.preventDefault();
    axios
      .put(`/updatepassword/${id}`, {
        oldpassword: formData?.oldpassword,
        newpassword: formData?.newpassword,
        confirmnewpassword: formData?.confirmnewpassword,
      })
      .then(() => window.location.reload(true), { replace: true })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Reset Password
        </h3>
      </div>
      <div className="p-7">
        <form onSubmit={updatePassword}>
          <InputField
            label="Old Password"
            name="oldpassword"
            id="oldPassword"
            type="password"
            placeholder="********"
            onChange={handleChange}
            defaultValue={formData?.oldpassword}
            icon={<BsShieldLock size="20" />}
          />

          <InputField
            label="New Password"
            name="newpassword"
            id="newPassword"
            type="password"
            placeholder="********"
            onChange={handleChange}
            defaultValue={formData?.newpassword}
            icon={<BsShieldLock size="20" />}
          />

          <InputField
            label="Confirm New Password"
            name="confirmnewpassword"
            id="confirmNewPassword"
            type="password"
            placeholder="********"
            onChange={handleChange}
            defaultValue={formData?.confirmnewpassword}
            icon={<BsShieldLock size="20" />}
          />

          <div className="flex justify-end gap-4.5">
            <button
              className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
              type="submit"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
