import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { saveAuthData } from '../../utils/AuthUtils';

function Login() {
  const [nic, setNic] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await AuthService.login(nic, password);
      saveAuthData(response.fullName, response.nic);
      setMessage('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/agrahara-dashboard');
        window.location.reload();
      }, 1500);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;

      if (error.response?.status === 401 || errorMsg.toLowerCase().includes('invalid')) {
        setMessage('Invalid NIC or password. Please try again.');
      } else {
        setMessage(`Login failed: ${errorMsg}`);
      }

      console.error('Login error:', error);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '110px', paddingBottom: '50px' }}>
      <div className="row align-items-center justify-content-center">
        {/* Left side - SVG */}
        <div className="col-md-5 d-none d-md-flex justify-content-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="350" height="350" fill="none" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="30" stroke="#0d6efd" strokeWidth="4" />
            <path d="M20 40h24M20 32h24M20 24h24" stroke="#0d6efd" strokeWidth="2" strokeLinecap="round" />
            <circle cx="48" cy="48" r="4" fill="#0d6efd" />
            <circle cx="16" cy="48" r="4" fill="#0d6efd" />
            <circle cx="32" cy="16" r="4" fill="#0d6efd" />
          </svg>
        </div>

        {/* Right side - Login Form */}
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0 p-4 rounded-4">
            <h3 className="mb-4 text-center text-primary">Member Login</h3>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="nationalId" className="form-label fw-semibold">National ID Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="nationalId"
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                  placeholder="Enter your National ID Number"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 rounded-pill py-2">
                Login
              </button>

              {message && (
                <div className="alert alert-info text-center mt-3" role="alert">
                  {message}
                </div>
              )}

              <div className="text-center mt-4">
                <span className="text-muted">Not yet a member? </span>
                <a href="/agrahara-signup" className="text-decoration-none fw-semibold text-primary">
                  Sign up now
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
