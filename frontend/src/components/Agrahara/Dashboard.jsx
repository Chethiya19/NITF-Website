import React, { useEffect, useState } from 'react';
import MemberService from '../../services/MemberService';
import { getMemberName } from '../../utils/AuthUtils';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
  const [memberProfile, setMemberProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await MemberService.getMemberProfile();
        setMemberProfile(profile);
      } catch (err) {
        setError('Failed to fetch member profile. Please login again.');
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
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Welcome, {getMemberName()}!</h2>
        <p className="text-muted">Here’s your member dashboard</p>
      </div>

      <div className="row align-items-center justify-content-center">
        {/* SVG Illustration - Left Side */}
        <div className="col-md-5 text-center mb-4 mb-md-0">
          <svg
            width="180"
            height="180"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto d-block mb-4"
          >
            <circle cx="32" cy="32" r="32" fill="#E0F7FA" />
            <circle cx="32" cy="22" r="10" fill="#0277BD" />
            <path
              d="M16 50C16 42 22 36 32 36C42 36 48 42 48 50"
              fill="#0288D1"
            />
            <path
              d="M32 34C24 34 18 40 18 48H46C46 40 40 34 32 34Z"
              fill="#03A9F4"
            />
            <circle cx="32" cy="22" r="6" fill="white" />
          </svg>
        </div>

        {/* Member Details - Right Side */}
        <div className="col-md-6">
          {memberProfile && (
            <div className="card shadow-lg rounded-4" style={{ background: 'linear-gradient(135deg, #e0f7fa, #ffffff)' }}>
              <div className="card-body">
                <h5 className="card-title text-primary mb-4">
                  <span role="img" aria-label="person">👤</span> Member Details
                </h5>
                <p className="mb-2"><strong>NIC:</strong> {memberProfile.nic}</p>
                <p className="mb-2"><strong>Full Name:</strong> {memberProfile.fullName}</p>
                <p className="mb-2"><strong>Email:</strong> {memberProfile.email}</p>
                <p className="mb-0"><strong>Mobile:</strong> {memberProfile.mobile}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
