import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CareGiverLayout from "../../layout/CareGiverLayout";
import DefaultLayout from "../../layout/DefaultLayout";
import FacilityAdminLayout from "../../layout/FacilityAdminLayout";
import { loginContext } from "../context/auth";
import axios from "../services/axios";

function ViewIncident() {
  const { logout, loggedIn, user } = useContext(loginContext);
  const admin = user?.role === "admin";
  const facilityAdmin = user?.role === "facilityadmin";
  const caregiver = user?.role === "caregiver";

  const [incidentData, setIncidentData] = useState([]);
  const [reportingStaff, setReportingStaff] = useState([]);
  const [currentPatientUniqueId, setCurrentPatientUniqueId] = useState([]);
  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("edit");

  // To Get Current Details
  useEffect(() => {
    axios.get(`/reports/?edit=${id}`).then((response) => {
      setIncidentData(response?.data);
      setReportingStaff(response.data?.staff[0]?.fullname);
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
                  Report Name
                </h1>
                <p className="px-4 py">{incidentData?.reportname}</p>
              </div>
              <div className="rounded-lg border border-black mt-4 lg:mt-0">
                <h1 className="border-b border-b-black px-4 py font-semibold text-md">
                  Issued By
                </h1>
                <p className="px-4 py">{reportingStaff}</p>
              </div>
            </div>
            <h1 className="py text-md mt-4 border border-black p-2 rounded-lg">
              <span className=" font-semibold">Patient: </span>
              <span>
                {incidentData?.patientname}
                {" - "}
                {currentPatientUniqueId}
              </span>
            </h1>
            <div>
              <h2 className="mt-4 font-semibold">Text</h2>
              <h3 className="w-full border border-black rounded-lg p-4">
                {incidentData?.reporttext}
              </h3>
            </div>
            <div className="mt-4">
              <h1 className="mt-4 font-semibold">Photo</h1>
              <img src={incidentData?.picturereport} />
            </div>
            <div className="mt-4">
              <h1 className="mt-4 font-semibold">Document</h1>
              <img src={incidentData?.pdfreport} />
            </div>
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
                  Report Name
                </h1>
                <p className="px-4 py">{incidentData?.reportname}</p>
              </div>
              <div className="rounded-lg border border-black mt-4 lg:mt-0">
                <h1 className="border-b border-b-black px-4 py font-semibold text-md">
                  Issued By
                </h1>
                <p className="px-4 py">{reportingStaff}</p>
              </div>
            </div>
            <h1 className="py text-md mt-4 border border-black p-2 rounded-lg">
              <span className=" font-semibold">Patient: </span>
              <span>
                {incidentData?.patientname}
                {" - "}
                {currentPatientUniqueId}
              </span>
            </h1>
            <div>
              <h2 className="mt-4 font-semibold">Text</h2>
              <h3 className="w-full border border-black rounded-lg p-4">
                {incidentData?.reporttext}
              </h3>
            </div>
            <div className="mt-4">
              <h1 className="mt-4 font-semibold">Photo</h1>
              <img src={incidentData?.picturereport} />
            </div>
            <div className="mt-4">
              <h1 className="mt-4 font-semibold">Document</h1>
              <img src={incidentData?.pdfreport} />
            </div>
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
                  Report Name
                </h1>
                <p className="px-4 py">{incidentData?.reportname}</p>
              </div>
              <div className="rounded-lg border border-black mt-4 lg:mt-0">
                <h1 className="border-b border-b-black px-4 py font-semibold text-md">
                  Issued By
                </h1>
                <p className="px-4 py">{reportingStaff}</p>
              </div>
            </div>
            <h1 className="py text-md mt-4 border border-black p-2 rounded-lg">
              <span className=" font-semibold">Patient: </span>
              <span>
                {incidentData?.patientname}
                {" - "}
                {currentPatientUniqueId}
              </span>
            </h1>
            <div>
              <h2 className="mt-4 font-semibold">Text</h2>
              <h3 className="w-full border border-black rounded-lg p-4">
                {incidentData?.reporttext}
              </h3>
            </div>
            <div className="mt-4">
              <h1 className="mt-4 font-semibold">Photo</h1>
              <img src={incidentData?.picturereport} />
            </div>
            <div className="mt-4">
              <h1 className="mt-4 font-semibold">Document</h1>
              <img src={incidentData?.pdfreport} />
            </div>
          </div>
        </CareGiverLayout>
      )}
    </>
  );
}

export default ViewIncident;
