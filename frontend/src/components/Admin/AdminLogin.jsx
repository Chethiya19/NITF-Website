import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import adminSVG from '../../assets/admin.svg';
import AdminAuthService from '../../services/AdminAuthService';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await AdminAuthService.login(username, password);
      setMessage(response.message);
      console.log('Login successful! Backend response:', response);
      navigate('/admin-dashboard');
    } catch (error) {
      let errorMessage = 'Login failed.';
      if (error.response) {
        errorMessage = error.response.data.message || 'Invalid credentials or server error.';
      } else if (error.request) {
        errorMessage = 'No response from server. Please check if the backend is running.';
      } else {
        errorMessage = 'Error: ' + error.message;
      }
      setMessage(errorMessage);
      console.error('Login error:', errorMessage);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center" style={{ backgroundColor: '#e3f2fd' }}>
      <div className="row w-100 shadow rounded" style={{ overflow: 'hidden', maxWidth: '1100px', margin: '0 auto' }}>
        {/* Left Side with SVG */}
        <div className="col-md-6 bg-primary d-flex justify-content-center align-items-center p-4">
          <img
            src={adminSVG}
            alt="Admin Illustration"
            className="img-fluid"
            style={{ maxHeight: '200px' }}
          />
        </div>

        {/* Right Side with Login Form */}
        <div className="col-md-6 bg-white p-5">
          <h3 className="text-center text-primary mb-4">Admin Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>

          {message && (
            <div
              className={`alert mt-3 ${
                message.toLowerCase().includes('success') ? 'alert-success' : 'alert-danger'
              }`}
              role="alert"
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
