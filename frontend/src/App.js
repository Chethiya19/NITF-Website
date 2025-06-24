import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Motor from './components/Motor';
import NonMotor from './components/NonMotor';
import Reinsurance from './components/Reinsurance';
import SRCC from './components/SRCC';
import Downloads from './components/Downloads';

// imports for Agrahara 
import AgraharaLayout from './components/Agrahara/AgraharaLayout';
import AgraharaLogin from './components/Agrahara/Login';
import AgraharaSignup from './components/Agrahara/Signup';
import AgraharaDashboard from './components/Agrahara/Dashboard'
import ViewProfile from './components/Agrahara/ViewProfile';
import EditProfile from './components/Agrahara/EditProfile';
import ReportUpload from './components/Agrahara/ReportUpload';
import Settings from './components/Agrahara/Setting';
import Dependents from './components/Agrahara/Dependents';

// imports for Staff 
import StaffLayout from './components/Staff/StaffLayout';
import StaffLogin from './components/Staff/StaffLogin';
import StaffRegister from './components/Staff/StaffRegister';
import StaffDashboard from './components/Staff/StaffDashboard';
import ManageMembers from './components/Staff/ManageMembers';
import MemberDetails from './components/Staff/MemberDetails';
import ManageDependents from './components/Staff/ManageDependents';
import DependentsPage from './components/Staff/DependentsPage';
import ManageReports from './components/Staff/ManageReports';
import ChangePassword from './components/Staff/ChangePassword';
import Institute from './components/Staff/Institute';


// imports for Admin 
import AdminLayout from './components/Admin/AdminLayout';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import MembersList from './components/Admin/MembersList';
// import MemberDetails from './components/Admin/MemberDetails';


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/agrahara-login" element={<AgraharaLogin />} />
          <Route path="/agrahara-signup" element={<AgraharaSignup />} />
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path="/staff-register" element={<StaffRegister />} />
          <Route path="/motor" element={<Motor />} />
          <Route path="/non-motor" element={<NonMotor />} />
          <Route path="/reinsurance" element={<Reinsurance />} />
          <Route path="/srcc" element={<SRCC />} />
          <Route path="/downloads" element={<Downloads />} />
        </Route>

        <Route element={<AgraharaLayout />}>
          <Route path="/agrahara-dashboard" element={<AgraharaDashboard />} />
          <Route path="/view-profile" element={<ViewProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/dependents" element={<Dependents />} />
          <Route path="/report-upload" element={<ReportUpload />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route element={<StaffLayout />}>
          <Route path="/staff-dashboard" element={<StaffDashboard />} />
          <Route path="/manage-members" element={<ManageMembers />} />
          <Route path="/member-details" element={<MemberDetails />} />
          <Route path="/manage-dependents" element={<ManageDependents />} />
          <Route path="/dependents/:memberId" element={<DependentsPage />} />
          <Route path="/manage-reports" element={<ManageReports />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/institute" element={<Institute />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/member-list" element={<MembersList />} />
          {/* <Route path="/member-details" element={<MemberDetails />} /> */}
        </Route>

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
