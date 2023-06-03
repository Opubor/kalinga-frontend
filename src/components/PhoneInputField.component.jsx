import React from "react";

const PhoneInputField = ({ label, name, id, className }) => {
  return (
    <div className={`mb-5.5 ${className}`}>
      <label
        className="mb-3 block text-sm font-medium text-black dark:text-white"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type="tel"
          id={id}
          name={name}
          placeholder={"123-456-7890"}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          className={`w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
          required
        />
      </div>
    </div>
  );
};

export default PhoneInputField;
