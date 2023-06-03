import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import FacilityAdminLayout from "../../layout/FacilityAdminLayout";
import { loginContext } from "../context/auth";
import axios from "../services/axios";

function ViewStaff() {
  const { logout, loggedIn, user } = useContext(loginContext);
  const admin = user?.role === "admin";
  const facilityAdmin = user?.role === "facilityadmin";
  const caregiver = user?.role === "caregiver";

  const [staffData, setStaffData] = useState([]);
  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("edit");

  // To Get Current Details
  useEffect(() => {
    axios.get(`/staff/?edit=${id}`).then((response) => {
      setStaffData(response?.data);
    });
  }, []);
  return (
    <>
      {admin && (
        <DefaultLayout>
          <div className="flex justify-center items-center w-full">
            <div className="flex-col justify-center items-center text-center">
              <div className="flex justify-center items-center">
                <img
                  src={staffData?.profilepic}
                  alt="Profile Picture"
                  className="w-32 rounded-full"
                />
              </div>
              <p className="font-semibold">{staffData?.fullname}</p>
              <p>{staffData?.role}</p>
              <p>{staffData?.email}</p>
              <p>{staffData?.phonenumber}</p>
              <p>{staffData?.dob}</p>
              <p>
                {staffData?.street} {staffData?.city} {staffData?.state}
                {" - "}
                {staffData?.zipcode}
              </p>
            </div>
          </div>
        </DefaultLayout>
      )}
      {facilityAdmin && (
        <FacilityAdminLayout>
          <div className="flex justify-center items-center w-full">
            <div className="flex-col justify-center items-center text-center">
              <div className="flex justify-center items-center">
                <img
                  src={staffData?.profilepic}
                  alt="Profile Picture"
                  className="w-32 rounded-full"
                />
              </div>
              <p className="font-semibold">{staffData?.fullname}</p>
              <p>{staffData?.role}</p>
              <p>{staffData?.email}</p>
              <p>{staffData?.phonenumber}</p>
              <p>{staffData?.dob}</p>
              <p>
                {staffData?.street} {staffData?.city} {staffData?.state}
                {" - "}
                {staffData?.zipcode}
              </p>
            </div>
          </div>
        </FacilityAdminLayout>
      )}
    </>
  );
}

export default ViewStaff;
