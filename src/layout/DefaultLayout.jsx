import React, { useContext, useState } from "react";
import Sidebar from "../components/sidebars/Sidebar";
import Header from "../components/Header";
import { loginContext } from "../pages/context/auth";
import { Navigate } from "react-router-dom";
import FacilityAdminSidebar from "../components/sidebars/FacilityAdminSidebar";
import CareGiversSidebar from "../components/sidebars/CareGiversSidebar";

const DefaultLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, loggedIn, user } = useContext(loginContext);

  if (!loggedIn) {
    return <Navigate to={"/"} />;
  }

  const admin = user?.role === "admin";

  return (
    <>
      {admin ? (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {/* <!-- ===== Page Wrapper Start ===== --> */}
          <div className="flex h-screen overflow-hidden">
            {/* <!-- ===== Sidebar Start ===== --> */}
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />

            {/* <!-- ===== Sidebar End ===== --> */}

            {/* <!-- ===== Content Area Start ===== --> */}
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              {/* <!-- ===== Header Start ===== --> */}
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              {/* <!-- ===== Header End ===== --> */}

              {/* <!-- ===== Main Content Start ===== --> */}
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  {children}
                </div>
              </main>
              {/* <!-- ===== Main Content End ===== --> */}
            </div>
            {/* <!-- ===== Content Area End ===== --> */}
          </div>
          {/* <!-- ===== Page Wrapper End ===== --> */}
        </div>
      ) : (
        "UnAuthorized"
      )}
    </>
  );
};

export default DefaultLayout;
