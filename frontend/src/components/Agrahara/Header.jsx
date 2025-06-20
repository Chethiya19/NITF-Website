import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { isAuthenticated, getMemberName, clearAuthData } from '../../utils/AuthUtils';

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [memberName, setMemberName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(isAuthenticated());
    if (isAuthenticated()) {
      setMemberName(getMemberName());
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setLoggedIn(isAuthenticated());
      setMemberName(isAuthenticated() ? getMemberName() : '');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      clearAuthData();
      setLoggedIn(false);
      setMemberName('');
      navigate('/agrahara-login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <div className="d-flex align-items-center">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="fas fa-home me-2"></i>
          <span>Agrahara Member</span>
        </Link>
      </div>

      <div className="ms-auto d-flex align-items-center">
        {loggedIn && (
          <>
            <span className="navbar-text me-3 d-flex align-items-center">
              <i className="fas fa-user me-1"></i> {memberName}
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
