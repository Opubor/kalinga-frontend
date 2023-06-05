import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CareGiverLayout from "../../layout/CareGiverLayout";
import DefaultLayout from "../../layout/DefaultLayout";
import FacilityAdminLayout from "../../layout/FacilityAdminLayout";
import { loginContext } from "../context/auth";
import axios from "../services/axios";

function ViewPatient() {
  const { logout, loggedIn, user } = useContext(loginContext);
  const admin = user?.role === "admin";
  const facilityAdmin = user?.role === "facilityadmin";
  const caregiver = user?.role === "caregiver";

  const [patientData, setPatientData] = useState([]);
  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("edit");

  // To Get Current Details
  useEffect(() => {
    axios.get(`/patients/?edit=${id}`).then((response) => {
      setPatientData(response?.data);
    });
  }, []);
  return (
    <>
      {admin && (
        <DefaultLayout>
          <div className="flex justify-center items-center w-full">
            <div className="flex-col justify-center items-center text-center">
              <h1 className="py text-md mt-4 border border-black p-2 rounded-lg">
                <span className=" font-semibold">Patient Name/Id: </span>
                <span>
                  {" "}
                  {patientData?.fullname}
                  {" - "} {patientData?.uniqueid}
                </span>
              </h1>
              <h1 className="py text-md mt-4 border border-black p-2 rounded-lg">
                <span className=" font-semibold">Phone Number: </span>
                <span>{patientData?.phonenumber}</span>
              </h1>
              <h1 className="py text-md mt-4 border border-black p-2 rounded-lg">
                <span className=" font-semibold">Email: </span>
                <span>{patientData?.email}</span>
              </h1>
              <h1 className="py text-md mt-4 border border-black p-2 rounded-lg">
                <span className=" font-semibold">Date of Birth: </span>
                <span>{patientData?.dob}</span>
              </h1>
              <h1 className="py text-md mt-4 border border-black p-2 rounded-lg">
                <span className="block font-semibold">Address </span>
                <span className="block font-bold">
                  Street: {patientData?.street}
                </span>
                <span className="block font-bold">
                  City: {patientData?.city}
                </span>
                <span className="block font-bold">
                  State: {patientData?.state}
                </span>
                <span className="block font-bold">
                  Zipcode:
                  {patientData?.zipcode}
                </span>
              </h1>

              <h1 className="py text-md mt-4 border border-black p-2 rounded-lg">
                <span className=" font-semibold">City: </span>
                <span>{patientData?.city}</span>
              </h1>

              <h1 className="py text-md mt-4 border border-black p-2 rounded-lg">
                <span className=" font-semibold">State: </span>
                <span>{patientData?.state}</span>
              </h1>

              <h1 className="py text-md mt-4 border border-black p-2 rounded-lg">
                <span className=" font-semibold">Zipcode: </span>
                <span>{patientData?.zipcode}</span>
              </h1>

              <div>
                <h2 className="mt-4 font-semibold">Medications</h2>
                <h3 className="w-full border border-black rounded-lg p-4">
                  {patientData?.medications?.split("\n").map((drug, i) => (
                    <div key={i} className="flex gap-2 text-lg">
                      <span>{i + 1}.</span>
                      <span>{drug}</span>
                    </div>
                  ))}
                </h3>
              </div>
              <div>
                <h2 className="mt-4 font-semibold">Ailment if any</h2>
                <h3 className="w-full border border-black rounded-lg p-4">
                  {patientData?.ailment?.split("\n").map((drug, i) => (
                    <div key={i} className="flex gap-2 text-lg">
                      <span>{i + 1}.</span>
                      <span>{drug}</span>
                    </div>
                  ))}
                </h3>
              </div>
              <div>
                <h2 className="mt-4 font-semibold">Note</h2>
                <h3 className="w-full border border-black rounded-lg p-4">
                  {patientData?.note}
                </h3>
              </div>
            </div>
          </div>
        </DefaultLayout>
      )}
      {facilityAdmin && (
        <FacilityAdminLayout>
          <div className="flex justify-center items-center w-full">
            <div className="flex-col justify-center items-center text-center">
              <h1 className="py text-md mt-4 border border-black p-2 rounded-lg">
                <span className=" font-semibold">Patient Name/Id: </span>
                <span>
                  {" "}
                  {patientData?.fullname}
                  {" - "} {patientData?.uniqueid}
                </span>
              </h1>
              <h1 className="py text-md mt-4 border border-black p-2 rounded-lg">
                <span className=" font-semibold">Phone Number: </span>
                <span>{patientData?.phonenumber}</span>
              </h1>
              <h1 className="py text-md mt-4 border border-black p-2 rounded-lg">
                <span className=" font-semibold">Email: </span>
                <span>{patientData?.email}</span>
              </h1>
              <h1 className="py text-md mt-4 border border-black p-2 rounded-lg">
                <span className=" font-semibold">Date of Birth: </span>
                <span>{patientData?.dob}</span>
              </h1>
              <h1 className="py text-md mt-4 border border-black p-2 rounded-lg">
                <span className="block font-semibold">Address </span>
                <span className="block font-bold">
                  Street: {patientData?.street}
                </span>
                <span className="block font-bold">
                  City: {patientData?.city}
                </span>
                <span className="block font-bold">
                  State: {patientData?.state}
                </span>
                <span className="block font-bold">
                  Zipcode:
                  {patientData?.zipcode}
                </span>
              </h1>

              <div>
                <h2 className="mt-4 font-semibold">Medications</h2>
                <h3 className="w-full border border-black rounded-lg p-4">
                  {patientData?.medications?.split("\n").map((drug, i) => (
                    <div key={i} className="flex gap-2 text-lg">
                      <span>{i + 1}.</span>
                      <span>{drug}</span>
                    </div>
                  ))}
                </h3>
              </div>
              <div>
                <h2 className="mt-4 font-semibold">Ailment if any</h2>
                <h3 className="w-full border border-black rounded-lg p-4">
                  {patientData?.ailment?.split("\n").map((drug, i) => (
                    <div key={i} className="flex gap-2 text-lg">
                      <span>{i + 1}.</span>
                      <span>{drug}</span>
                    </div>
                  ))}
                </h3>
              </div>
              <div>
                <h2 className="mt-4 font-semibold">Note</h2>
                <h3 className="w-full border border-black rounded-lg p-4">
                  {patientData?.note}
                </h3>
              </div>
            </div>
          </div>
        </FacilityAdminLayout>
      )}
      {caregiver && (
        <CareGiverLayout>
          <div className="flex justify-center items-center w-full">
            <div className="flex-col justify-center items-center text-center">
              <h1 className="py text-md mt-4 border border-black p-2 rounded-lg">
                <span className=" font-semibold">Patient Name/Id: </span>
                <span>
                  {" "}
                  {patientData?.fullname}
                  {" - "} {patientData?.uniqueid}
                </span>
              </h1>
              <h1 className="py text-md mt-4 border border-black p-2 rounded-lg">
                <span className=" font-semibold">Phone Number: </span>
                <span>{patientData?.phonenumber}</span>
              </h1>
              <h1 className="py text-md mt-4 border border-black p-2 rounded-lg">
                <span className=" font-semibold">Email: </span>
                <span>{patientData?.email}</span>
              </h1>
              <h1 className="py text-md mt-4 border border-black p-2 rounded-lg">
                <span className=" font-semibold">Date of Birth: </span>
                <span>{patientData?.dob}</span>
              </h1>
              <h1 className="py text-md mt-4 border border-black p-2 rounded-lg">
                <span className="block font-semibold">Address </span>
                <span className="block font-bold">
                  Street: {patientData?.street}
                </span>
                <span className="block font-bold">
                  City: {patientData?.city}
                </span>
                <span className="block font-bold">
                  State: {patientData?.state}
                </span>
                <span className="block font-bold">
                  Zipcode:
                  {patientData?.zipcode}
                </span>
              </h1>

              <div>
                <h2 className="mt-4 font-semibold">Medications</h2>
                <h3 className="w-full border border-black rounded-lg p-4">
                  {patientData?.medications?.split("\n").map((drug, i) => (
                    <div key={i} className="flex gap-2 text-lg">
                      <span>{i + 1}.</span>
                      <span>{drug}</span>
                    </div>
                  ))}
                </h3>
              </div>
              <div>
                <h2 className="mt-4 font-semibold">Ailment if any</h2>
                <h3 className="w-full border border-black rounded-lg p-4">
                  {patientData?.ailment?.split("\n").map((drug, i) => (
                    <div key={i} className="flex gap-2 text-lg">
                      <span>{i + 1}.</span>
                      <span>{drug}</span>
                    </div>
                  ))}
                </h3>
              </div>
              <div>
                <h2 className="mt-4 font-semibold">Note</h2>
                <h3 className="w-full border border-black rounded-lg p-4">
                  {patientData?.note}
                </h3>
              </div>
            </div>
          </div>
        </CareGiverLayout>
      )}
    </>
  );
}

export default ViewPatient;
