import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "../SidebarLinkGroup";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Logo from "../../images/logo/logo.svg";

import { RiMenu3Line, RiMenu2Fill } from "react-icons/ri";
import { TbLayoutDashboard, TbReportMedical } from "react-icons/tb";
import { BsHouseUpFill } from "react-icons/bs";
import { FaUserNurse } from "react-icons/fa";
import { MdOutlineElderly, MdOutlineDangerous } from "react-icons/md";

function FacilityAdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  const menu = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Patients", link: "/facilityadmin/patients" },
    { name: "Patients", link: "/facilityadmin/appointments" },
    { name: "Staff", link: "/facilityadmin/staff" },
    { name: "Incident Reports", link: "/facilityadmin/incident-reports" },
    { name: "Death Reports", link: "/facilityadmin/death-reports" },
    { name: "Profile", link: "/profile" },
  ];

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const sidebarItems = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <TbLayoutDashboard size="30" className="text-primary" />,
    },
    {
      name: "Patients",
      link: "/facilityadmin/patients",
      icon: <MdOutlineElderly size="30" className="text-primary" />,
    },
    {
      name: "Daily Checks",
      link: "/facilityadmin/appointments",
      icon: <MdOutlineElderly size="30" className="text-primary" />,
    },
    {
      name: "Staff",
      link: "/facilityadmin/staffs",
      icon: <FaUserNurse size="30" className="text-primary" />,
    },
    {
      name: "Incident Reports",
      link: "/facilityadmin/incident-reports",
      icon: <TbReportMedical size="30" className="text-primary" />,
    },
    {
      name: "Death Reports",
      link: "/facilityadmin/death-reports",
      icon: <MdOutlineDangerous size="30" className="text-primary" />,
    },
    {
      name: "Profile",
      link: "/profile",
      icon: <MdOutlineDangerous size="30" className="text-primary" />,
    },
  ];

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-4 lg:py-6.5 font-bold text-2xl text-bodydark1  ">
        <NavLink to="/">
          Kalinga<span className="text-primary">Base</span>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <AiOutlineArrowLeft size="30" />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {sidebarItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.link}
                    className={`group relative flex items-center gap-3 rounded-sm py-2 text-lg py-4 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes(item.link) &&
                      "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* <!-- Menu Group --> */}
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
}

export default FacilityAdminSidebar;
