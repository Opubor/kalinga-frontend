import React, { useEffect, useState } from "react";
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

const FacilityTable = () => {
  const [facilitiesData, setFacilitiesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  // SEARCH
  const search = (data) => {
    axios.get(`/facility?q=${data}`).then((response) => {
      setFacilitiesData(response.data);
      setCurrentPage(1);
    });
  };

  // SORT
  const sortAsc = () => {
    axios.get("/facility?sortAsc=ascending").then((response) => {
      setFacilitiesData(response?.data);
    });
  };
  const sortDsc = () => {
    axios.get("/facility?sortAsc=descending").then((response) => {
      setFacilitiesData(response?.data);
    });
  };

  useEffect(() => {
    getFacilities();
  }, []);

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = facilitiesData.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(facilitiesData.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <>
      <TablesLayout
        tableName={"FACILITIES"}
        search={<SearchInput onSearch={search} />}
        pagination={
          <>
            <TotalNo totalnumber={facilitiesData?.length} />
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
            <SortTd
              name={"Facility Name"}
              sortAsc={sortAsc}
              sortDsc={sortDsc}
            />
            <Th>Address</Th>
            <Th>Admin</Th>
            <Th>Phone Number</Th>
            <OptionsTh>Actions</OptionsTh>
          </Thead>
          <tbody>
            {currentPosts.map((data, index) => {
              return (
                <tr key={index}>
                  <Td>{index + 1 * (currentPage * postsPerPage - 9)}</Td>
                  <Td>{data?.name}</Td>
                  <Td>{data?.street}</Td>
                  <Td>
                    {data?.staff[0]?.uniqueid} {" - "}
                    {data?.staff[0]?.fullname}
                  </Td>
                  <Td>{data?.phonenumber}</Td>
                  <OptionsTd>
                    <ViewButton
                      viewFunction={`/admin/view-facility?edit=${data?._id}`}
                    >
                      View
                    </ViewButton>
                    <EditButton
                      editFunction={`/admin/edit-facility?edit=${data?._id}`}
                    >
                      Edit
                    </EditButton>
                    <DeleteButton
                      path={"facility"}
                      id={data?._id}
                      record={getFacilities}
                    >
                      Delete
                    </DeleteButton>
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

export default FacilityTable;
