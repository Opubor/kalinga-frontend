import React from "react";

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
      <input
        className={`w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary
        }`}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  </div>
);

export default InputField;
