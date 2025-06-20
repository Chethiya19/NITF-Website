import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StaffAuthService from '../../services/StaffAuthService';
import { isAuthenticated, getStaffName, clearAuthData } from '../../utils/StaffAuthUtils';

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [staffName, setStaffName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = isAuthenticated();
    setLoggedIn(authStatus);
    if (authStatus) {
      setStaffName(getStaffName());
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const authStatus = isAuthenticated();
      setLoggedIn(authStatus);
      setStaffName(authStatus ? getStaffName() : '');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = async () => {
    try {
      await StaffAuthService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      clearAuthData();
      setLoggedIn(false);
      setStaffName('');
      navigate('/staff-login');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <div className="d-flex align-items-center">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="fas fa-home me-2"></i>
          <span>Staff Member</span>
        </Link>
      </div>

      <div className="ms-auto d-flex align-items-center">
        {loggedIn && (
          <>
            <span className="navbar-text me-3 d-flex align-items-center">
              <i className="fas fa-user me-1"></i> {staffName}
            </span>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
