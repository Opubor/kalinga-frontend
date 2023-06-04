import React, { useContext, useEffect, useState } from "react";
import axios from "../pages/services/axios";

import DeleteButton from "./buttons/DeleteButton";
import SearchInput from "./SearchInput";
import TotalNo from "./TotalNo";
import ReactPagination from "./ReactPagination";
import Th from "./table/Th";
import Td from "./table/Td";
import IndexNo from "./table/IndexNo";
import EditButton from "./buttons/EditButton";
import ViewButton from "./buttons/ViewButton";
import OptionsTd from "./table/OptionsTd";
import OptionsTh from "./table/OptionsTh";
import Thead from "./table/Thead";
import SortTd from "./table/SortTd";
import Table from "./table/Table";
import TablesLayout from "./TablesLayout";
import { loginContext } from "../pages/context/auth";
import { Link } from "react-router-dom";

function PatientTable() {
  const { logout, loggedIn, user } = useContext(loginContext);

  const facilityAdmin = user?.role === "facilityadmin";

  const [patientsData, setPatientsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  let id = user?._id;
  let role = user?.role;
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

  // SEARCH
  const search = (data) => {
    axios.get(`/patients?q=${data}`).then((response) => {
      setPatientsData(response.data);
      setCurrentPage(1);
    });
  };

  // SORT
  const sortAsc = () => {
    axios.get("/patients?sortAsc=ascending").then((response) => {
      setPatientsData(response?.data);
    });
  };
  const sortDsc = () => {
    axios.get("/patients?sortAsc=descending").then((response) => {
      setPatientsData(response?.data);
    });
  };

  useEffect(() => {
    getPatients();
  }, []);

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = patientsData.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(patientsData.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <>
      <TablesLayout
        tableName={"Patients"}
        search={<SearchInput onSearch={search} />}
        pagination={
          <>
            <TotalNo totalnumber={patientsData?.length} />
            <ReactPagination
              pageCount={pageCount}
              handlePageClick={handlePageClick}
            />
          </>
        }
      >
        <Table>
          <Thead>
            <IndexNo>#</IndexNo>
            <SortTd name={"Patient"} sortAsc={sortAsc} sortDsc={sortDsc} />
            <Th>Phone Number</Th>
            <Th>Address</Th>
            <Th>Facility</Th>
            <Th>Add Appointment</Th>
            <OptionsTh>Actions</OptionsTh>
          </Thead>
          <tbody>
            {currentPosts.map((data, index) => {
              return (
                <tr key={index}>
                  <Td>{index + 1 * (currentPage * postsPerPage - 9)}</Td>
                  <Td>
                    {data?.uniqueid} - {data?.fullname}
                  </Td>
                  <Td>{data?.phonenumber}</Td>
                  <Td>{data?.street}</Td>
                  <Td>{data?.staff[0]?.facilityname}</Td>
                  <Td>
                    <Link
                      className="bg-primary p-2 rounded-md text-white"
                      to={`/appointment?edit=${data?._id}`}
                    >
                      Add Appointment
                    </Link>
                  </Td>
                  <OptionsTd>
                    <ViewButton
                      viewFunction={`/view-patient?edit=${data?._id}`}
                    >
                      View
                    </ViewButton>
                    {facilityAdmin && (
                      <>
                        <EditButton
                          editFunction={`/edit-patient?edit=${data?._id}`}
                        >
                          Edit
                        </EditButton>
                        <DeleteButton
                          path={"patient"}
                          id={data?._id}
                          record={getPatients}
                        >
                          Delete
                        </DeleteButton>
                      </>
                    )}
                  </OptionsTd>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </TablesLayout>
    </>
  );
}

export default PatientTable;
