import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { IoIosArrowDown, IoMdSettings } from "react-icons/io";
import { HiOutlineLogout } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { loginContext } from "../pages/context/auth";

const DropdownUserItem = ({ to, Icon, children }) => (
  <Link
    to={to}
    className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
  >
    <Icon size="25" />
    {children}
  </Link>
);

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  const { logout, loggedIn, user } = useContext(loginContext);

  if (!loggedIn) {
    return <Navigate to={"/"} />;
  }

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user?.fullname}
          </span>
          <span className="block text-xs">{user?.role}</span>
        </span>

        <span className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white">
          Hi!
        </span>

        <IoIosArrowDown size="20" />
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <DropdownUserItem to="/settings" Icon={IoMdSettings}>
              Account Settings
            </DropdownUserItem>
          </li>
        </ul>
        <button
          onClick={logout}
          className="flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
        >
          <HiOutlineLogout size="25" />
          LogOut
        </button>
      </div>
    </div>
  );
};

export default DropdownUser;
