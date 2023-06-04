import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CareGiverLayout from "../../layout/CareGiverLayout";
import DefaultLayout from "../../layout/DefaultLayout";
import FacilityAdminLayout from "../../layout/FacilityAdminLayout";
import { loginContext } from "../context/auth";
import axios from "../services/axios";

function ViewAppointment() {
  const { logout, loggedIn, user } = useContext(loginContext);
  const admin = user?.role === "admin";
  const facilityAdmin = user?.role === "facilityadmin";
  const caregiver = user?.role === "caregiver";

  const [assignedStaff, setAssignedStaff] = useState([]);
  const [assignedStaffid, setAssignedStaffId] = useState([]);
  const [facility, setFacility] = useState([]);
  const [currentPatientUniqueId, setCurrentPatientUniqueId] = useState([]);
  const [appointments, setAppointments] = useState([]);
  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("edit");

  // To Get Current Details
  useEffect(() => {
    axios.get(`/appointments/?edit=${id}`).then((response) => {
      setAppointments(response?.data);
      setAssignedStaff(response.data?.assignedstaff[0]?.fullname);
      setAssignedStaffId(response.data?.assignedstaff[0]?.uniqueid);
      setFacility(response.data?.facilityadmin[0]?.facilityname);
      setCurrentPatientUniqueId(response.data?.patients[0]?.uniqueid);
    });
  }, []);

  return (
    <>
      {admin && (
        <DefaultLayout>
          <div>
            <h1 className="text-xl font-bold mb-4">INCIDENT</h1>
            <div className="lg:flex justify-between items-center">
              <div className="rounded-lg border border-black">
                <h1 className="border-b border-b-black px-4 py font-semibold text-md">
                  Patient Name
                </h1>
                <p className="px-4 py">
                  {currentPatientUniqueId} {" - "}
                  {appointments?.patientname}
                </p>
              </div>
              <div className="rounded-lg border border-black mt-4 lg:mt-0">
                <h1 className="border-b border-b-black px-4 py font-semibold text-md">
                  Assigned Staff
                </h1>
                <p className="px-4 py">
                  {assignedStaffid}
                  {" - "}
                  {assignedStaff}
                </p>
              </div>
            </div>
            <h1 className="py text-md mt-4 border border-black p-2 rounded-lg">
              <span className=" font-semibold">Facility: </span>
              <span>{facility}</span>
            </h1>
            {appointments?.morningsession === "true" && (
              <div>
                <h2 className="mt-4 font-semibold">Morning Session</h2>
                <div className="w-full border border-black rounded-lg p-4">
                  <h1> From: {appointments?.morningstart}</h1>
                  <h1> To: {appointments?.morningend}</h1>
                </div>
              </div>
            )}
            {appointments?.afternoonsession === "true" && (
              <div>
                <h2 className="mt-4 font-semibold">Afternoon Session</h2>
                <div className="w-full border border-black rounded-lg p-4">
                  <h1> From: {appointments?.afternoonstart}</h1>
                  <h1> To: {appointments?.afternoonend}</h1>
                </div>
              </div>
            )}
            {appointments?.eveningsession === "true" && (
              <div>
                <h2 className="mt-4 font-semibold">Evening Session</h2>
                <div className="w-full border border-black rounded-lg p-4">
                  <h1> From: {appointments?.eveningstart}</h1>
                  <h1> To: {appointments?.eveningend}</h1>
                </div>
              </div>
            )}
          </div>
        </DefaultLayout>
      )}
      {facilityAdmin && (
        <FacilityAdminLayout>
          <div>
            <h1 className="text-xl font-bold mb-4">INCIDENT</h1>
            <div className="lg:flex justify-between items-center">
              <div className="rounded-lg border border-black">
                <h1 className="border-b border-b-black px-4 py font-semibold text-md">
                  Patient Name
                </h1>
                <p className="px-4 py">
                  {currentPatientUniqueId} {" - "}
                  {appointments?.patientname}
                </p>
              </div>
              <div className="rounded-lg border border-black mt-4 lg:mt-0">
                <h1 className="border-b border-b-black px-4 py font-semibold text-md">
                  Assigned Staff
                </h1>
                <p className="px-4 py">
                  {assignedStaffid}
                  {" - "}
                  {assignedStaff}
                </p>
              </div>
            </div>
            <h1 className="py text-md mt-4 border border-black p-2 rounded-lg">
              <span className=" font-semibold">Facility: </span>
              <span>{facility}</span>
            </h1>
            {appointments?.morningsession === "true" && (
              <div>
                <h2 className="mt-4 font-semibold">Morning Session</h2>
                <div className="w-full border border-black rounded-lg p-4">
                  <h1> From: {appointments?.morningstart}</h1>
                  <h1> To: {appointments?.morningend}</h1>
                </div>
              </div>
            )}
            {appointments?.afternoonsession === "true" && (
              <div>
                <h2 className="mt-4 font-semibold">Afternoon Session</h2>
                <div className="w-full border border-black rounded-lg p-4">
                  <h1> From: {appointments?.afternoonstart}</h1>
                  <h1> To: {appointments?.afternoonend}</h1>
                </div>
              </div>
            )}
            {appointments?.eveningsession === "true" && (
              <div>
                <h2 className="mt-4 font-semibold">Evening Session</h2>
                <div className="w-full border border-black rounded-lg p-4">
                  <h1> From: {appointments?.eveningstart}</h1>
                  <h1> To: {appointments?.eveningend}</h1>
                </div>
              </div>
            )}
          </div>
        </FacilityAdminLayout>
      )}
      {caregiver && (
        <CareGiverLayout>
          <div>
            <h1 className="text-xl font-bold mb-4">INCIDENT</h1>
            <div className="lg:flex justify-between items-center">
              <div className="rounded-lg border border-black">
                <h1 className="border-b border-b-black px-4 py font-semibold text-md">
                  Patient Name
                </h1>
                <p className="px-4 py">
                  {currentPatientUniqueId} {" - "}
                  {appointments?.patientname}
                </p>
              </div>
              <div className="rounded-lg border border-black mt-4 lg:mt-0">
                <h1 className="border-b border-b-black px-4 py font-semibold text-md">
                  Assigned Staff
                </h1>
                <p className="px-4 py">
                  {assignedStaffid}
                  {" - "}
                  {assignedStaff}
                </p>
              </div>
            </div>
            <h1 className="py text-md mt-4 border border-black p-2 rounded-lg">
              <span className=" font-semibold">Facility: </span>
              <span>{facility}</span>
            </h1>
            {appointments?.morningsession === "true" && (
              <div>
                <h2 className="mt-4 font-semibold">Morning Session</h2>
                <div className="w-full border border-black rounded-lg p-4">
                  <h1> From: {appointments?.morningstart}</h1>
                  <h1> To: {appointments?.morningend}</h1>
                </div>
              </div>
            )}
            {appointments?.afternoonsession === "true" && (
              <div>
                <h2 className="mt-4 font-semibold">Afternoon Session</h2>
                <div className="w-full border border-black rounded-lg p-4">
                  <h1> From: {appointments?.afternoonstart}</h1>
                  <h1> To: {appointments?.afternoonend}</h1>
                </div>
              </div>
            )}
            {appointments?.eveningsession === "true" && (
              <div>
                <h2 className="mt-4 font-semibold">Evening Session</h2>
                <div className="w-full border border-black rounded-lg p-4">
                  <h1> From: {appointments?.eveningstart}</h1>
                  <h1> To: {appointments?.eveningend}</h1>
                </div>
              </div>
            )}
          </div>
        </CareGiverLayout>
      )}
    </>
  );
}

export default ViewAppointment;
