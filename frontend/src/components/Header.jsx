import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdClose } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/nitflogo.jpg';
import { FcBusinessman, FcBusinesswoman, FcLock, FcManager } from "react-icons/fc";
import './Header.css';

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const logoStyle = {
    width: '40px',
    height: '50px',
    marginRight: '10px',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(255, 255, 255, 0.15)',
    transition: 'transform 0.3s ease',
  };

  const sidebarLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '17px',
    color: '#333',
    backgroundColor: '#f0f0f0',
    transition: 'all 0.3s ease',
    marginBottom: '10px'
  };

  const sidebarLinkHoverStyle = {
    ...sidebarLinkStyle,
    backgroundColor: '#e0f0ff',
    color: '#0056b3',
    transform: 'scale(1.03)',
    boxShadow: '0 2px 8px rgba(0, 123, 255, 0.2)'
  };

  

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      <header className="header">
        <div className="container d-flex align-items-center justify-content-between">
          {/* Left: Logo and Title */}
          <div className="d-flex align-items-center">
            <img src={logo} alt="NITF Logo" style={logoStyle} />
            <div>
              <h1 className="site-title m-0 text-white">NITF</h1>
              <p className="m-0 text-white" style={{ fontSize: '11px' }}>
                National Insurance Trust Fund
              </p>
            </div>
          </div>

          {/* Center: Navigation */}
          <nav className="d-flex align-items-center flex-grow-1 justify-content-center">
            <ul className="nav">
              <li className="nav-item">
                <Link to="/" className="nav-link text-white" onClick={handleHomeClick}>
                  Home
                </Link>
              </li>

              {/* Services Dropdown */}
              <li className="nav-item dropdown hover-dropdown">
                <span className="nav-link dropdown-toggle text-white" role="button">
                  Services
                </span>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="/agrahara-login" className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}>
                      Agrahara
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/motor" className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}>
                      Motor
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/non-motor" className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}>
                      Non Motor
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/reinsurance" className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}>
                      Reinsurance
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/srcc" className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}>
                      SRCC & TC
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link text-white" href="/#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/#contact">Contact</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/downloads">Downloads</a>
              </li>
            </ul>
          </nav>

          {/* Right: Only User Icon button */}
          <div className="d-flex align-items-center">
            <button
              onClick={toggleSidebar}
              className="btn btn-link text-white p-0 user-icon-btn"
              aria-label="Open user menu"
            >
              <FaUserCircle />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Drawer */}
      <div
        className={`sidebar-drawer ${sidebarOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
      >
        <div
          className="sidebar-content"
          onClick={e => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            className="btn-close-icon"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
            title="Close"
          >
            <MdClose size={28} />
          </button>

          <h5 className="sidebar-title">User Menu</h5>
          <ul className="list-unstyled mt-4">
            <li>
              <Link
                to="/staff-login"
                onClick={toggleSidebar}
                style={hoveredIndex === 0 ? sidebarLinkHoverStyle : sidebarLinkStyle}
                onMouseEnter={() => setHoveredIndex(0)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <FcManager className="me-2" size={40} /> Staff Login
              </Link>
            </li>
            <li>
              <Link
                to="/staff-register"
                onClick={toggleSidebar}
                style={hoveredIndex === 1 ? sidebarLinkHoverStyle : sidebarLinkStyle}
                onMouseEnter={() => setHoveredIndex(1)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <FcBusinessman className="me-2" size={40} /> Staff Sign Up
              </Link>
            </li>
            <li>
              <Link
                to="/agrahara-login"
                onClick={toggleSidebar}
                style={hoveredIndex === 2 ? sidebarLinkHoverStyle : sidebarLinkStyle}
                onMouseEnter={() => setHoveredIndex(2)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <FcBusinesswoman className="me-2" size={40} /> Agrahara Member Login
              </Link>
            </li>
            <li>
              <a
                href="/admin-login"
                target="_blank"
                rel="noopener noreferrer"
                onClick={toggleSidebar}
                style={hoveredIndex === 3 ? sidebarLinkHoverStyle : sidebarLinkStyle}
                onMouseEnter={() => setHoveredIndex(3)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <FcLock className="me-2" size={40} /> Admin Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
