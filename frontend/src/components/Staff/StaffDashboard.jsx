import React, { useEffect, useState } from 'react';
import StaffService from '../../services/StaffService';
import MemberService from '../../services/MemberService';
import DependentService from '../../services/DependentService';
import ReportsService from '../../services/ReportsService';
import { getStaffName } from '../../utils/StaffAuthUtils';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StaffDashboard.css'; 

function StaffDashboard() {
  const [staffProfile, setStaffProfile] = useState(null);
  const [memberCount, setMemberCount] = useState(null);
  const [dependentCount, setDependentCount] = useState(null);
  const [reportCount, setReportCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await StaffService.getStaffProfile();
        setStaffProfile(profile);

        // Fetch count
        const count = await MemberService.getMemberCount();
        setMemberCount(count);
        const count1 = await DependentService.getDependentCount();
        setDependentCount(count1);
        const count2 = await ReportsService.getReportCount();
        setReportCount(count2);
      } catch (err) {
        setError('Failed to fetch staff profile or member count. Please login again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <div className="alert alert-danger mt-4 text-center">{error}</div>;

  return (
    <div className="container mt-3 fade-in">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-success slide-down">Welcome, {getStaffName()}!</h2>
        <p className="text-muted slide-up">This is your interactive staff dashboard.</p>
      </div>

      <div className="row align-items-center justify-content-center g-4">
        <div className="col-md-5 text-center scale-in">
          <svg
            width="180"
            height="180"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto d-block pulse"
          >
            <circle cx="32" cy="32" r="32" fill="#E8F5E9" />
            <circle cx="32" cy="22" r="10" fill="#2E7D32" />
            <path d="M16 50C16 42 22 36 32 36C42 36 48 42 48 50" fill="#388E3C" />
            <path d="M32 34C24 34 18 40 18 48H46C46 40 40 34 32 34Z" fill="#4CAF50" />
            <circle cx="32" cy="22" r="6" fill="white" />
          </svg>
        </div>

        <div className="col-md-6 scale-in">
          {staffProfile && (
            <div
              className="card shadow-lg rounded-4 border-0 pulse"
              style={{ background: 'linear-gradient(135deg, #e8f5e9, #ffffff)' }}
            >
              <div className="card-body">
                <h5 className="card-title text-success mb-4">
                  <span role="img" aria-label="staff">🧑‍💼</span> Staff Details
                </h5>
                <p className="mb-2"><strong>NIC:</strong> {staffProfile.nic}</p>
                <p className="mb-2"><strong>Full Name:</strong> {staffProfile.fullName}</p>
                <p className="mb-2"><strong>Email:</strong> {staffProfile.email}</p>
                <p className="mb-0"><strong>Mobile:</strong> {staffProfile.mobile}</p>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-4 scale-in">
          {memberCount !== null && (
            <div
              className="card shadow-lg rounded-4 border-0 mt-4 fade-in"
              style={{ background: 'linear-gradient(135deg, #e8f5e9, #ffffff)' }}
            >
              <div className="card-body text-center">
                <h5 className="card-title text-success  mb-3">
                  <span role="img" aria-label="members">👥</span> Total Registered Members
                </h5>
                <h2 className="display-6 fw-bold">{memberCount}</h2>
              </div>
            </div>
          )}
        </div>

        <div className="col-md-4 scale-in">
          {dependentCount !== null && (
            <div
              className="card shadow-lg rounded-4 border-0 mt-4 fade-in"
              style={{ background: 'linear-gradient(135deg, #e8f5e9, #ffffff)' }}
            >
              <div className="card-body text-center">
                <h5 className="card-title text-success  mb-3">
                  <span role="img" aria-label="dependents">👨‍👩‍👧</span> Total Dependents
                </h5>
                <h2 className="display-6 fw-bold">{dependentCount}</h2>
              </div>
            </div>
          )}
        </div>
        
        <div className="col-md-4 scale-in">
          {reportCount !== null && (
            <div
              className="card shadow-lg rounded-4 border-0 mt-4 fade-in"
              style={{ background: 'linear-gradient(135deg, #e8f5e9, #ffffff)' }}
            >
              <div className="card-body text-center">
                <h5 className="card-title text-success  mb-3">
                  <span role="img" aria-label="reports">📄</span> Total Uploaded Reports
                </h5>
                <h2 className="display-6 fw-bold">{reportCount}</h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StaffDashboard;
