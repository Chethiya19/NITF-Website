import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/nitflogo.jpg';

const Sidebar = () => {
  return (
    <aside style={sidebarStyle}>
      <div style={logoContainerStyle}>
        <img src={logo} alt="Nitf Logo" style={logoStyle} />
      </div>
      <h5 style={headingStyle}>National Insurance Trust Fund</h5>
      <hr style={hrStyle} />
      <ul style={ulStyle}>
        <li><Link to="/agrahara-dashboard" style={linkStyle} className="sidebar-link">Dashboard</Link></li>
        <li><Link to="/view-profile" style={linkStyle} className="sidebar-link">View Profile</Link></li>
        <li><Link to="/edit-profile" style={linkStyle} className="sidebar-link">Edit Profile</Link></li>
        <li><Link to="/dependents" style={linkStyle} className="sidebar-link">Dependents</Link></li>
        <li><Link to="/report-upload" style={linkStyle} className="sidebar-link">Reports</Link></li>
        <li><Link to="/settings" style={linkStyle} className="sidebar-link">Settings</Link></li>
      </ul>
    </aside>
  );
};


const sidebarStyle = {
  width: '230px',
  height: '100vh',
  background: 'linear-gradient(180deg, rgb(27, 102, 177) 0%, rgb(38, 88, 163) 100%)',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '20px',
  boxShadow: '2px 0 8px rgba(0, 0, 0, 0.25)',
  fontFamily: 'Segoe UI, sans-serif',
};

const logoContainerStyle = {
  width: '60px',
  marginBottom: '15px',
};

const logoStyle = {
  width: '100%',
  height: 'auto',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(255, 255, 255, 0.15)',
  transition: 'transform 0.3s ease',
};

const headingStyle = {
  fontSize: '0.85rem',
  fontWeight: 'bold',
  textAlign: 'center',
  padding: '0 10px',
  marginBottom: '10px',
  lineHeight: '1.3',
};

const hrStyle = {
  width: '85%',
  border: '1px solid #fff',
  marginBottom: '10px',
};

const ulStyle = {
  listStyle: 'none',
  padding: 0,
  width: '100%',
  textAlign: 'center',
};

const linkStyle = {
  display: 'block',
  padding: '12px 0',
  color: '#fff',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '1.1rem',
  transition: 'background-color 0.3s ease, color 0.3s ease',
};

export default Sidebar;
