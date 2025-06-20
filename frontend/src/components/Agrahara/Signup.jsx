import React, { useState } from 'react';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    nic: '',
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      await AuthService.signup(
        formData.nic,
        formData.fullName,
        formData.email,
        formData.mobile,
        formData.password
      );
      setMessage('Signup successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/agrahara-login');
      }, 2000);
    } catch (error) {
      if (error.response?.data?.message) {
        setMessage(`Error: ${error.response.data.message}`);
      } else {
        setMessage(`Error: ${error.message || 'Signup failed'}`);
      }
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '40px' }}>
      <div className="row justify-content-center align-items-center">
        {/* Left side - SVG */}
        <div className="col-md-6 d-none d-md-flex justify-content-center">
          <div
            style={{
              backgroundColor: '#e6f4ea',
              padding: '20px',
              borderRadius: '20px',
              display: 'inline-block',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="300"
              height="300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#198754"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a5 5 0 10-6 0m3 8c-3.31 0-6-2.24-6-5h12c0 2.76-2.69 5-6 5z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 8v6m3-3h-6" />
            </svg>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="col-md-5">
          <div className="card shadow-sm p-4">
            <h4 className="mb-4 text-center">Sign Up Form</h4>
            <form onSubmit={handleSignup}>
              <div className="mb-2">
                <input
                  type="text"
                  name="nic"
                  className="form-control"
                  placeholder="National ID Number"
                  value={formData.nic}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2">
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2">
                <input
                  type="tel"
                  name="mobile"
                  className="form-control"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-success w-100 mb-2">
                Sign Up
              </button>

              {message && <div className="alert alert-info text-center">{message}</div>}

              <div className="text-center">
                Already a member?{' '}
                <a href="/agrahara-login" className="text-success">
                  Login here
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
