import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token or any admin data from localStorage (if used)
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName'); // optional
    console.log('Logged out from Admin Dashboard.');
    navigate('/admin-login'); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <div className="d-flex align-items-center">
        <Link className="navbar-brand d-flex align-items-center" to="/admin-dashboard">
          <i className="fas fa-user-shield me-2"></i>
          <span>Admin Portal</span>
        </Link>
      </div>

      <div className="ms-auto d-flex align-items-center">
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Header;
