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

const StaffTable = () => {
  const { logout, loggedIn, user } = useContext(loginContext);
  const admin = user?.role === "admin";
  const facilityadmin = user?.role === "facilityadmin";
  const caregiver = user?.role === "caregiver";

  const [staffsData, setStaffsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  let id = user?._id;
  let role = user?.role;
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

  // SEARCH
  const search = (data) => {
    axios
      .get(`/staff?q=${data}&staffid=${id}&role=${role}`)
      .then((response) => {
        setStaffsData(response?.data);
      });
  };

  // SORT
  const sortAsc = () => {
    axios
      .get(`/staff?sortAsc=ascending&staffid=${id}&role=${role}`)
      .then((response) => {
        setStaffsData(response?.data);
      });
  };
  const sortDsc = () => {
    axios
      .get(`/staff?sortAsc=descending&staffid=${id}&role=${role}`)
      .then((response) => {
        setStaffsData(response.data);
        setCurrentPage(1);
      });
  };

  useEffect(() => {
    getStaffs();
  }, []);

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = staffsData.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(staffsData.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <>
      <TablesLayout
        tableName={"Active Staff"}
        search={<SearchInput onSearch={search} />}
        pagination={
          <>
            <TotalNo totalnumber={staffsData?.length} />
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
            <SortTd name={"Name"} sortAsc={sortAsc} sortDsc={sortDsc} />
            <Th>Phone Number</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Facility</Th>
            <OptionsTh>Actions</OptionsTh>
          </Thead>
          <tbody>
            {currentPosts.map((data, index) => {
              return (
                <tr key={index}>
                  <Td>{index + 1 * (currentPage * postsPerPage - 9)}</Td>
                  <Td>
                    {data?.uniqueid} {" - "} {data?.fullname}
                  </Td>
                  <Td>{data?.phonenumber}</Td>
                  <Td>{data?.email}</Td>
                  <Td>{data?.role}</Td>
                  <Td>{data?.facilityname}</Td>
                  <OptionsTd>
                    <ViewButton viewFunction={`/view-staff?edit=${data?._id}`}>
                      View
                    </ViewButton>
                    {data?.role === "caregiver" && facilityadmin && (
                      <>
                        <EditButton
                          editFunction={`/edit-staff?edit=${data?._id}`}
                        >
                          Edit
                        </EditButton>
                        <DeleteButton
                          path={"staff"}
                          id={data?._id}
                          record={getStaffs}
                        >
                          Delete
                        </DeleteButton>
                      </>
                    )}
                    {data?.role !== "caregiver" && admin && (
                      <>
                        <EditButton
                          editFunction={`/edit-staff?edit=${data?._id}`}
                        >
                          Edit
                        </EditButton>
                        <DeleteButton
                          path={"staff"}
                          id={data?._id}
                          record={getStaffs}
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
};

export default StaffTable;
