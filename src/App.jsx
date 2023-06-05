import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginProvider } from "./pages/context/auth";

const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));

// ===========ADMIN==========
const Facilities = React.lazy(() => import("./pages/admin/Facilities"));
const Patients = React.lazy(() => import("./pages/admin/Patients"));
const Staffs = React.lazy(() => import("./pages/admin/Staffs"));
const Profile = React.lazy(() => import("./pages/admin/Profile"));
const Settings = React.lazy(() => import("./pages/admin/Settings"));
const Incidents = React.lazy(() => import("./pages/admin/Incidents"));
const Deaths = React.lazy(() => import("./pages/admin/Deaths"));
const AdminAppointments = React.lazy(() =>
  import("./pages/admin/Appointments")
);

// =========EDITS===========
const EditStaff = React.lazy(() => import("./pages/edit/EditStaff"));
const EditIncident = React.lazy(() => import("./pages/edit/EditIncident"));
const EditDeath = React.lazy(() => import("./pages/edit/EditDeath"));
const EditPatient = React.lazy(() => import("./pages/edit/EditPatient"));
const EditFacility = React.lazy(() => import("./pages/edit/EditFacility"));

// ========VIEWS==========
const ViewIncident = React.lazy(() => import("./pages/view/ViewIncident"));
const ViewDeath = React.lazy(() => import("./pages/view/ViewDeath"));
const ViewStaff = React.lazy(() => import("./pages/view/ViewStaff"));
const ViewPatient = React.lazy(() => import("./pages/view/ViewPatient"));
const ViewFacility = React.lazy(() => import("./pages/view/ViewFacility"));
const ViewAppointment = React.lazy(() =>
  import("./pages/view/ViewAppointment")
);

// ===============FACILITY ADMIN========================
const FacilityAdminPatients = React.lazy(() =>
  import("./pages/facilityAdmin/Patients")
);
const FacilityAdminStaffs = React.lazy(() =>
  import("./pages/facilityAdmin/Staffs")
);
const FacilityAdminIncidents = React.lazy(() =>
  import("./pages/facilityAdmin/Incidents")
);
const FacilityAdminDeaths = React.lazy(() =>
  import("./pages/facilityAdmin/Deaths")
);
const AddAppointment = React.lazy(() =>
  import("./pages/facilityAdmin/AddAppointment")
);
const FacilityAdminAppointments = React.lazy(() =>
  import("./pages/facilityAdmin/Appointments")
);
const EditAppointment = React.lazy(() =>
  import("./pages/facilityAdmin/EditAppointment")
);

// ====================CARE GIVERS======================
const CareGiverAppointments = React.lazy(() =>
  import("./pages/caregivers/Appointments")
);
const Feedback = React.lazy(() => import("./pages/caregivers/Feedback"));

// =======PRELOADER===============
const Preloader = React.lazy(() => import("./components/PreLoader"));

function App() {
  return (
    <Suspense fallback={<Preloader />}>
      <LoginProvider>
        <BrowserRouter>
          <ToastContainer autoClose={2000} position="top-center" />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* ==================Admin===================== */}
            <Route path="/admin/facilities" element={<Facilities />} />
            <Route path="/admin/patients" element={<Patients />} />
            <Route path="/admin/staffs" element={<Staffs />} />
            <Route path="/admin/incident-reports" element={<Incidents />} />
            <Route path="/admin/death-reports" element={<Deaths />} />
            <Route path="/admin/edit-facility" element={<EditFacility />} />
            <Route path="/admin/appointments" element={<AdminAppointments />} />
            <Route path="/admin/view-facility" element={<ViewFacility />} />

            {/* ======================VIEWS=============================== */}
            <Route path="/view-incident" element={<ViewIncident />} />
            <Route path="/view-death" element={<ViewDeath />} />
            <Route path="/view-staff" element={<ViewStaff />} />
            <Route path="/view-patient" element={<ViewPatient />} />
            <Route path="/view-appointment" element={<ViewAppointment />} />

            {/* ======================EDITS=============================== */}
            <Route path="/edit-incident" element={<EditIncident />} />
            <Route path="/edit-death" element={<EditDeath />} />
            <Route path="/edit-patient" element={<EditPatient />} />
            <Route path="/edit-staff" element={<EditStaff />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />

            {/* =================FACILITY ADMIN================= */}
            <Route
              path="/facilityadmin/patients"
              element={<FacilityAdminPatients />}
            />
            <Route
              path="/facilityadmin/staffs"
              element={<FacilityAdminStaffs />}
            />
            <Route
              path="/facilityadmin/incident-reports"
              element={<FacilityAdminIncidents />}
            />
            <Route
              path="/facilityadmin/death-reports"
              element={<FacilityAdminDeaths />}
            />
            <Route
              path="/facilityadmin/appointments"
              element={<FacilityAdminAppointments />}
            />
            <Route
              path="/facilityadmin/edit-appointment"
              element={<EditAppointment />}
            />
            <Route path="/appointment" element={<AddAppointment />} />
            {/* =================CAREGIVERS================= */}
            <Route
              path="/caregiver/appointments"
              element={<CareGiverAppointments />}
            />
            <Route path="/caregiver/feedback" element={<Feedback />} />
          </Routes>
        </BrowserRouter>
      </LoginProvider>
    </Suspense>
  );
}

export default App;
