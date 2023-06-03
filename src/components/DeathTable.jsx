import React, { useContext, useEffect, useState } from "react";
import { loginContext } from "../pages/context/auth";
import axios from "../pages/services/axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import DeleteButton from "./buttons/DeleteButton";
import Modal from "./Modal";
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

function DeathTable() {
  const { logout, loggedIn, user } = useContext(loginContext);
  const admin = user?.role === "admin";
  const facilityadmin = user?.role === "facilityadmin";
  const caregiver = user?.role === "caregiver";

  const [deaths, setDeaths] = useState([]);
  const [addPhoto, setAddPhoto] = useState(false);
  const [addFile, setAddFile] = useState(false);
  const [pictureReport, setPictureReport] = useState(null);
  const [pdfReport, setPdfReport] = useState(null);
  const [currentDeathId, setCurrentDeathId] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Get Deaths ===================================================
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

  // SEARCH
  const search = (data) => {
    axios.get(`/reports?type=death&q=${data}`).then((response) => {
      setDeaths(response.data);
      setCurrentPage(1);
    });
  };

  // SORT
  const sortAsc = () => {
    axios.get("/reports?type=death&sortAsc=ascending").then((response) => {
      setDeaths(response?.data);
    });
  };
  const sortDsc = () => {
    axios.get("/reports?type=death&sortAsc=descending").then((response) => {
      setDeaths(response?.data);
    });
  };
  // UseEffect ============================================
  useEffect(() => {
    getDeaths();
  }, []);

  // handlePictureChange ====================================
  const handlePictureChange = (event) => {
    setPictureReport(event.target.files[0]);
  };
  // Submit Picture =========================================
  const submitPicture = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("picturereport", pictureReport);
    axios
      .put(`/picturereport/${currentDeathId}`, formData)
      .then((res) => {
        getDeaths();
        toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  // Handle File Change ========================================
  const handleFileChange = (event) => {
    setPdfReport(event.target.files[0]);
  };
  // Submit File ===============================================
  const submitFile = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("pdfreport", pdfReport);
    axios
      .put(`/pdfreport/${currentDeathId}`, formData)
      .then((res) => {
        getDeaths();
        toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = deaths.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(deaths.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <>
      {/* ====================Table============================ */}
      <TablesLayout
        tableName={"Death Report"}
        search={<SearchInput onSearch={search} />}
        pagination={
          <>
            <TotalNo totalnumber={deaths?.length} />
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
            <SortTd name={"Report Name"} sortAsc={sortAsc} sortDsc={sortDsc} />
            <Th>Patient</Th>
            <Th>Date</Th>
            {facilityadmin && (
              <>
                <Th>Photo</Th>
                <Th>Document</Th>
              </>
            )}
            <OptionsTh>Actions</OptionsTh>
          </Thead>
          <tbody>
            {currentPosts.map((data, index) => {
              return (
                <tr key={index}>
                  <Td>{index + 1 * (currentPage * postsPerPage - 9)}</Td>
                  <Td>{data?.reportname}</Td>
                  <Td>{data?.patientname}</Td>
                  <Td>{data?.date}</Td>
                  {facilityadmin && (
                    <>
                      <Td>
                        <>
                          {data?.picturereport ? (
                            <a
                              className="border-2 px-2 rounded-md border-success dark:border-success"
                              href={data?.picturereport}
                              target="_blank"
                            >
                              View Photo
                            </a>
                          ) : (
                            <button
                              className="border-2 px-2 rounded-md border-black dark:border-white"
                              onClick={() => {
                                setAddPhoto(true), setCurrentDeathId(data?._id);
                              }}
                            >
                              Add Photo
                            </button>
                          )}
                        </>
                      </Td>
                      <Td>
                        <>
                          {data?.pdfreport ? (
                            <a
                              className="border-2 px-2 rounded-md border-success dark:border-success"
                              href={data?.pdfreport}
                              target="_blank"
                            >
                              View Document
                            </a>
                          ) : (
                            <button
                              className="border-2 px-2 rounded-md border-black dark:border-white"
                              onClick={() => {
                                setAddFile(true), setCurrentDeathId(data?._id);
                              }}
                            >
                              Add Document
                            </button>
                          )}
                        </>
                      </Td>
                    </>
                  )}
                  <OptionsTd>
                    <ViewButton viewFunction={`/view-death?edit=${data?._id}`}>
                      View
                    </ViewButton>
                    {facilityadmin && (
                      <>
                        <EditButton
                          editFunction={`/edit-death?edit=${data?._id}`}
                        >
                          Edit
                        </EditButton>
                        <DeleteButton
                          path={"report"}
                          id={data?._id}
                          record={getDeaths}
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

      {/* ====================Modal Photo======================== */}
      <Modal
        styles={`${addPhoto ? "flex justify-center items-center" : "hidden"}`}
        formName={"Add Photo"}
        closeModalFunction={() => setAddPhoto(!addPhoto)}
      >
        <form onSubmit={submitPicture} encType="multipart/form-data">
          <div className="mb-5.5">
            <input
              type="file"
              name="picturereport"
              onChange={handlePictureChange}
              // className="sr-only"
            />
          </div>
          <button className="bg-boxdark-2 px-12 py-2 text-white rounded-lg hover:bg-blue-800">
            Submit
          </button>
        </form>
      </Modal>

      {/* ====================Modal File========================== */}
      <Modal
        styles={`${addFile ? "flex justify-center items-center" : "hidden"}`}
        formName={"Add File"}
        closeModalFunction={() => setAddFile(!addFile)}
      >
        <form onSubmit={submitFile} encType="multipart/form-data">
          <div className="mb-5.5">
            <input
              type="file"
              name="pdfreport"
              onChange={handleFileChange}
              // className="sr-only"
            />
          </div>
          <button className="bg-boxdark-2 px-12 py-2 text-white rounded-lg hover:bg-blue-800">
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
}

export default DeathTable;
