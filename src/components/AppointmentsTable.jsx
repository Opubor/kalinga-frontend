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

function AppointmentsTable() {
  const { logout, loggedIn, user } = useContext(loginContext);
  const facilityAdmin = user?.role === "facilityadmin";
  const careGiver = user?.role === "caregiver";

  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  let id = user?._id;
  let role = user?.role;

  function getAppointments() {
    axios
      .get(`/appointments?role=${role}&staffid=${id}`)
      .then((response) => {
        setAppointments(response?.data);
      })
      .catch((response) => {
        console.log(response.data);
      });
  }

  // SEARCH
  const search = (data) => {
    axios
      .get(`/appointments?q=${data}&staffid=${id}&role=${role}`)
      .then((response) => {
        setAppointments(response?.data);
      });
  };

  // SORT
  const sortAsc = () => {
    axios
      .get(`/appointments?sortAsc=ascending&staffid=${id}&role=${role}`)
      .then((response) => {
        setAppointments(response?.data);
      });
  };
  const sortDsc = () => {
    axios
      .get(`/appointments?sortAsc=descending&staffid=${id}&role=${role}`)
      .then((response) => {
        setAppointments(response.data);
        setCurrentPage(1);
      });
  };

  useEffect(() => {
    getAppointments();
  }, []);

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = appointments.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(appointments.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <>
      <TablesLayout
        tableName={"Daily Checks"}
        search={<SearchInput onSearch={search} />}
        pagination={
          <>
            <TotalNo totalnumber={appointments?.length} />
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
            <Th>Facility</Th>
            <Th>Care-Giver</Th>
            <Th>Morning Session</Th>
            <Th>Afternoon Session</Th>
            <Th>Evening Session</Th>
            <OptionsTh>Actions</OptionsTh>
          </Thead>
          <tbody>
            {currentPosts.map((data, index) => {
              return (
                <tr key={index}>
                  <Td>{index + 1 * (currentPage * postsPerPage - 9)}</Td>
                  <Td>
                    {data?.patients[0]?.uniqueid} {" - "} {data?.patientname}
                  </Td>
                  <Td>{data?.facilityadmin[0]?.facilityname}</Td>
                  <Td>
                    {data?.assignedstaff[0]?.uniqueid} {" - "}{" "}
                    {data?.assignedstaff[0]?.fullname}
                  </Td>
                  <Td>
                    {data?.morningsession === "true" ? (
                      <>
                        <p>From: {data?.morningstart}</p>
                        <p>To: {data?.morningend}</p>
                        <p>
                          {data?.morningcancelled === "true" ? (
                            <span className="bg-warning px-2 text-white rounded-sm">
                              Cancelled
                            </span>
                          ) : (
                            <>
                              {data?.morningcompleted === "true" ? (
                                <span className="bg-success px-2 text-white rounded-sm">
                                  Completed
                                </span>
                              ) : (
                                <span className="bg-danger px-2 text-white rounded-sm">
                                  Not Completed
                                </span>
                              )}
                            </>
                          )}
                        </p>
                      </>
                    ) : (
                      "---"
                    )}
                  </Td>
                  <Td>
                    {data?.afternoonsession === "true" ? (
                      <>
                        <p>From: {data?.afternoonstart}</p>
                        <p>To: {data?.afternoonend}</p>
                        <p>
                          {data?.afternooncancelled === "true" ? (
                            <span className="bg-warning px-2 text-white rounded-sm">
                              Cancelled
                            </span>
                          ) : (
                            <>
                              {data?.afternooncompleted === "true" ? (
                                <span className="bg-success px-2 text-white rounded-sm">
                                  Completed
                                </span>
                              ) : (
                                <span className="bg-danger px-2 text-white rounded-sm">
                                  Not Completed
                                </span>
                              )}
                            </>
                          )}
                        </p>
                      </>
                    ) : (
                      "---"
                    )}
                  </Td>
                  <Td>
                    {data?.eveningsession === "true" ? (
                      <>
                        <p>From: {data?.eveningstart}</p>
                        <p>To: {data?.eveningend}</p>
                        <p>
                          {data?.eveningcancelled === "true" ? (
                            <span className="bg-warning px-2 text-white rounded-sm">
                              Cancelled
                            </span>
                          ) : (
                            <>
                              {data?.eveningcompleted === "true" ? (
                                <span className="bg-success px-2 text-white rounded-sm">
                                  Completed
                                </span>
                              ) : (
                                <span className="bg-danger px-2 text-white rounded-sm">
                                  Not Completed
                                </span>
                              )}
                            </>
                          )}
                        </p>
                      </>
                    ) : (
                      "---"
                    )}
                  </Td>
                  <OptionsTd>
                    <ViewButton
                      viewFunction={`/view-appointment?edit=${data?._id}`}
                    >
                      View
                    </ViewButton>
                    {facilityAdmin && (
                      <>
                        <EditButton
                          editFunction={`/facilityadmin/edit-appointment?edit=${data?._id}`}
                        >
                          Edit
                        </EditButton>
                        <DeleteButton
                          path={"appointment"}
                          id={data?._id}
                          record={getAppointments}
                        >
                          Delete
                        </DeleteButton>
                      </>
                    )}
                    {careGiver && (
                      <>
                        <EditButton
                          editFunction={`/caregiver/feedback?edit=${data?._id}`}
                        >
                          Feedback
                        </EditButton>
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

export default AppointmentsTable;
