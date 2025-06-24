import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import GarageService from '../services/GarageService'; 

function Motor() {
  const [garages, setGarages] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchGarages = async () => {
      try {
        const data = await GarageService.getAllGarages();
        setGarages(data);
      } catch (error) {
        console.error('Failed to fetch garages:', error);
      }
    };

    fetchGarages();
  }, []);

  const containerStyle = {
    backgroundColor: '#f7f9fc',
    padding: '100px 60px',
    minHeight: '100vh',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    color: '#003366',
    fontWeight: 'bold',
    marginBottom: '30px',
    textAlign: 'center',
  };

  const tableStyle = {
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  };

  const thStyle = {
    backgroundColor: '#003366',
    color: '#ffffff',
    textAlign: 'center',
    verticalAlign: 'middle',
  };

  const tdStyle = {
    textAlign: 'center',
    verticalAlign: 'middle',
  };

  return (
    <div style={containerStyle} className="container-fluid">
      <h2 style={titleStyle}>Registered Garages</h2>
      <div className="table-responsive" data-aos="fade-up">
        <table className="table table-striped table-bordered" style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>No</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Address</th>
            </tr>
          </thead>
          <tbody>
            {garages.map((garage, index) => (
              <tr key={garage.id}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{garage.name}</td>
                <td style={tdStyle}>{garage.address}</td>
              </tr>
            ))}
            {garages.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No registered garages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Motor;
