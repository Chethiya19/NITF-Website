import React, { useState } from 'react';
import StaffAuthService from '../../services/StaffAuthService.js';
import { useNavigate } from 'react-router-dom';
import { FaIdCard, FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';

function StaffRegister() {
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
      await StaffAuthService.signup(
        formData.nic,
        formData.fullName,
        formData.email,
        formData.mobile,
        formData.password
      );
      setMessage('Staff registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/staff-login');
      }, 2000);
    } catch (error) {
      if (error.response?.data?.message) {
        setMessage(`Error: ${error.response.data.message}`);
      } else {
        setMessage(`Error: ${error.message || 'Registration failed'}`);
      }
      console.error('Staff signup error:', error);
    }
  };

  return (
    <div style={styles.bg}>
      <div style={styles.card}>
        <h2 style={styles.title}><span role="img" aria-label="staff login">👨‍💼</span>Staff Registration</h2>
        <form onSubmit={handleSignup}>

          <div style={styles.inputGroup}>
            <FaIdCard style={styles.icon} />
            <input
              type="text"
              name="nic"
              placeholder="National ID Number"
              value={formData.nic}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <FaUser style={styles.icon} />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <FaEnvelope style={styles.icon} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <FaPhone style={styles.icon} />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <FaLock style={styles.icon} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <FaLock style={styles.icon} />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            Register Staff
          </button>

          {message && <div style={styles.message}>{message}</div>}

          <p style={styles.loginText}>
            Already registered?{' '}
            <a href="/staff-login" style={styles.link}>
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  bg: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #4e54c8, #8f94fb)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '100px 0 10px 0',        // reduced padding from 20px to 10px
  },
  card: {
    background: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    padding: '15px 20px',      // reduced padding from 40px 30px to 25px 20px
    maxWidth: '420px',
    width: '100%',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    color: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',      // reduced margin from 30px to 20px
    fontWeight: 'bold',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    padding: '6px 12px',       // reduced padding from 10px 15px to 6px 12px
    marginBottom: '12px',      // reduced margin-bottom from 18px to 12px
  },
  icon: {
    color: '#fff',
    marginRight: '10px',       // slightly reduced from 12px
    fontSize: '1.1rem',        // slightly smaller icon
    minWidth: '20px',
  },
  input: {
    border: 'none',
    background: 'transparent',
    color: '#fff',
    width: '100%',
    outline: 'none',
    fontSize: '0.9rem',        // reduced font size from 1rem to 0.9rem
    height: '30px',            // added explicit height to reduce textbox height
  },
  button: {
    backgroundColor: '#fff',
    color: '#4e54c8',
    border: 'none',
    padding: '10px',           // reduced padding from 12px
    borderRadius: '8px',
    width: '100%',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    marginTop: '8px',          // reduced margin-top
  },
  message: {
    marginTop: '15px',         // reduced margin-top from 20px
    textAlign: 'center',
    background: '#fff',
    color: '#333',
    padding: '8px',            // reduced padding from 10px
    borderRadius: '8px',
    fontSize: '0.9rem',        // smaller font
  },
  loginText: {
    marginTop: '15px',         // reduced margin-top from 22px
    textAlign: 'center',
    fontSize: '0.85rem',       // smaller font
  },
  link: {
    color: '#ffdb58',
    textDecoration: 'underline',
    fontWeight: 'bold',
  },
};


export default StaffRegister;
