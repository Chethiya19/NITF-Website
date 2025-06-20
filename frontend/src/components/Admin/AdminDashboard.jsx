import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real JWT setup, you would remove the stored token (e.g., from localStorage)
    // localStorage.removeItem('jwtToken');
    console.log("Logged out from Admin Dashboard.");
    navigate('/admin-login'); // Redirect to login page after logout
  };

  return (
    <div className="admin-dashboard-container"> {/* Add a class for potential styling */}
      <h2>Welcome to the Admin Dashboard!</h2>
      <p>This is where admin-specific content will be displayed.</p>
      For a real app, you'd add protected content here
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;