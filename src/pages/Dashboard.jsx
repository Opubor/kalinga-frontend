import React, { useContext, useEffect, useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import CardOne from "../components/CardOne";
import axios from "../pages/services/axios";
import { toast } from "react-toastify";

import { BsHouseUpFill, BsCalendarCheck } from "react-icons/bs";
import { MdOutlineElderly } from "react-icons/md";
import { FaUserNurse } from "react-icons/fa";
import { loginContext } from "./context/auth";
import FacilityAdminLayout from "../layout/FacilityAdminLayout";
import CareGiverLayout from "../layout/CareGiverLayout";

function Dashboard() {
  const { user } = useContext(loginContext);
  const admin = user?.role === "admin";
  const facilityadmin = user?.role === "facilityadmin";
  const caregiver = user?.role === "caregiver";

  let id = user?._id;
  let role = user?.role;

  const [deaths, setDeaths] = useState([]);
  const [facilitiesData, setFacilitiesData] = useState([]);
  const [patientsData, setPatientsData] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [staffsData, setStaffsData] = useState([]);

  function getDeaths() {
    axios
      .get("/reports?type=death")
      .then((response) => {
        setDeaths(response?.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }

  function getFacilities() {
    axios
      .get("/facility")
      .then((response) => {
        setFacilitiesData(response?.data);
      })
      .catch((response) => {
        console.log(response.data);
      });
  }

  function getPatients() {
    axios
      .get(`/patients?role=${role}&facilityAdminId=${id}`)
      .then((response) => {
        setPatientsData(response?.data);
      })
      .catch((response) => {
        console.log(response.data);
      });
  }

  function getIncidents() {
    axios
      .get("/reports?type=incident")
      .then((response) => {
        setIncidents(response?.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }

  function getStaffs() {
    axios
      .get(`/staff?staffid=${id}&role=${role}`)
      .then((response) => {
        setStaffsData(response?.data);
      })
      .catch((response) => {
        console.log(response.data);
      });
  }

  // UseEffect ============================================
  useEffect(() => {
    if (user) {
      getDeaths();
      getFacilities();
      getPatients();
      getIncidents();
      getStaffs();
    }
  }, []);
  return (
    <>
      {admin && (
        <DefaultLayout>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            <CardOne
              cardName={"Facilities"}
              count={facilitiesData?.length ? facilitiesData.length : 0}
              IconComponent={BsHouseUpFill}
              link={"/admin/facilities"}
              additionalText={"Click see you facilities!"}
            />
            <CardOne
              cardName={"Patients"}
              count={patientsData?.length ? patientsData.length : 0}
              IconComponent={MdOutlineElderly}
              link={"/admin/patients"}
              additionalText={"Check out your patients!"}
            />

            <CardOne
              cardName={"Staff"}
              count={staffsData?.length ? staffsData.length : 0}
              IconComponent={FaUserNurse}
              link={"/admin/staffs"}
              additionalText={"See your staff!"}
            />

            <CardOne
              cardName={"Daily Checks"}
              // count={dailyChecks?.length ? dailyChecks.length : 0}
              IconComponent={BsCalendarCheck}
              link={"/admin/appointments"}
              additionalText={"Remaining daily checks!"}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mt-8">
            <CardOne
              cardName={"Incidents Reports"}
              count={incidents?.length ? incidents.length : 0}
              IconComponent={BsHouseUpFill}
              link={"/admin/incident-reports"}
              additionalText={"incident"}
            />
            <CardOne
              cardName={"Death Reports"}
              count={deaths?.length ? deaths?.length : 0}
              IconComponent={MdOutlineElderly}
              link={"/admin/death-reports"}
              additionalText={"Reports"}
            />
          </div>

          {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <ChartOne />
            <ChartTwo />
            <ChartThree />
            <MapOne />
            <div className="col-span-12 xl:col-span-8">
              <TableOne />
            </div>
            <ChatCard />
          </div> */}

          {/* <BigCalendar/> */}
        </DefaultLayout>
      )}
      {facilityadmin && (
        <FacilityAdminLayout>
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
              <CardOne
                cardName={"Patients"}
                count={patientsData?.length ? patientsData.length : 0}
                IconComponent={MdOutlineElderly}
                link={"/facilityadmin/patients"}
                additionalText={"Check out your patients!"}
              />

              <CardOne
                cardName={"Staff"}
                count={staffsData?.length ? staffsData.length : 0}
                IconComponent={FaUserNurse}
                link={"/facilityadmin/staffs"}
                additionalText={"See your staff!"}
              />

              <CardOne
                cardName={"Daily Checks"}
                // count={dailyChecks?.length ? dailyChecks.length : 0}
                IconComponent={BsCalendarCheck}
                link={"/facilityadmin/appointments"}
                additionalText={"Remaining daily checks!"}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 mt-8">
              <CardOne
                cardName={"Incidents Reports"}
                count={incidents?.length ? incidents.length : 0}
                IconComponent={BsHouseUpFill}
                link={"/facilityadmin/incident-reports"}
                additionalText={"incident"}
              />
              <CardOne
                cardName={"Death Reports"}
                count={deaths?.length ? deaths?.length : 0}
                IconComponent={MdOutlineElderly}
                link={"/facilityadmin/death-reports"}
                additionalText={"Reports"}
              />
            </div>

            {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <ChartOne />
      <ChartTwo />
      <ChartThree />
      <MapOne />
      <div className="col-span-12 xl:col-span-8">
        <TableOne />
      </div>
      <ChatCard />
    </div> */}

            {/* <BigCalendar/> */}
          </>
        </FacilityAdminLayout>
      )}
      {caregiver && (
        <CareGiverLayout>
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
              <CardOne
                cardName={"Daily Checks"}
                // count={dailyChecks?.length ? dailyChecks.length : 0}
                IconComponent={BsCalendarCheck}
                link={"/caregiver/appointments"}
                additionalText={"Remaining daily checks!"}
              />
            </div>

            {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <ChartOne />
      <ChartTwo />
      <ChartThree />
      <MapOne />
      <div className="col-span-12 xl:col-span-8">
        <TableOne />
      </div>
      <ChatCard />
    </div> */}

            {/* <BigCalendar/> */}
          </>
        </CareGiverLayout>
      )}
    </>
  );
}

export default Dashboard;
