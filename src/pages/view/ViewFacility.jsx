import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import axios from "../services/axios";

function ViewFacility() {
  const [facilities, setFacilities] = useState([]);
  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("edit");

  // To Get Current Details
  useEffect(() => {
    axios.get(`/facility/?edit=${id}`).then((response) => {
      setFacilities(response?.data);
    });
  }, []);

  return (
    <DefaultLayout>
      <div className="flex justify-center items-center w-full">
        <div className="flex-col justify-center items-center text-center">
          <p className="font-semibold">{facilities?.name}</p>
          <p>{facilities?.phonenumber}</p>
          <p>
            Location
            {facilities?.street}
            {" - "}
            {facilities?.city}
            {" - "}
            {facilities?.state}
            {" - "}
            {facilities?.zipcode}
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default ViewFacility;
