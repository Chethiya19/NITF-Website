import React, { useState } from 'react';

const Agrahara = () => {
  const [nic, setNic] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // for cookies
        body: JSON.stringify({ nic, password }),
      });

      const text = await response.text();

      if (response.ok) {
        setMessage('✅ Login successful');
        // TODO: Redirect user or update UI
        // For example:
        window.location.href = "/userdashboard";
      } else {
        setMessage(`❌ ${text}`);
      }
    } catch (error) {
      setMessage('❌ Network error. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '110px', paddingBottom: '50px' }}>
      <div className="row align-items-center">
        {/* Left side - SVG */}
        <div className="col-md-6 d-none d-md-flex justify-content-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="350" height="350" fill="none" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="30" stroke="#0d6efd" strokeWidth="4" />
            <path d="M20 40h24M20 32h24M20 24h24" stroke="#0d6efd" strokeWidth="2" strokeLinecap="round" />
            <circle cx="48" cy="48" r="4" fill="#0d6efd" />
            <circle cx="16" cy="48" r="4" fill="#0d6efd" />
            <circle cx="32" cy="16" r="4" fill="#0d6efd" />
          </svg>
        </div>

        {/* Right side - Login Form */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h3 className="mb-4 text-center">Member Login</h3>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="nationalId" className="form-label">National ID Number</label>
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
                <label htmlFor="password" className="form-label">Password</label>
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

              <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>

              {message && <div className="alert alert-info text-center">{message}</div>}

              <div className="text-center">
                Not yet a member?{' '}
                <a href="/agrahara-signup" className="text-primary">Sign up now</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agrahara;
