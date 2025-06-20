import React, { useState } from 'react';
import StaffAuthService from '../../services/StaffAuthService';
import { FaIdCard, FaLock } from 'react-icons/fa';

const StaffLogin = () => {
  const [nic, setNic] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await StaffAuthService.login(nic, password);
      setMessage('Login successful!');
      setMessageType('success');
      // Redirect after short delay to show message
      setTimeout(() => {
        window.location.href = "/staff-dashboard";
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data || 'Login failed');
      setMessageType('error');
    }
  };

  return (
    <div style={styles.bg}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          <span role="img" aria-label="staff login">👨‍💼</span> Staff Login
        </h2>
        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <FaIdCard style={styles.icon} />
            <input
              type="text"
              placeholder="National ID Number"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <FaLock style={styles.icon} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>Login</button>

          {message && (
            <div
              style={{
                ...styles.message,
                ...(messageType === 'success' ? styles.success : styles.error)
              }}
            >
              {message}
            </div>
          )}

          <p style={styles.registerText}>
            Not registered?{' '}
            <a href="/staff-register" style={styles.link}>Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  bg: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #4e54c8, #8f94fb)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '60px 0 0 0',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    padding: '40px 30px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    color: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    fontWeight: 'bold',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '20px',
  },
  icon: {
    color: '#fff',
    marginRight: '10px',
    fontSize: '1.2rem',
  },
  input: {
    border: 'none',
    background: 'transparent',
    color: '#fff',
    width: '100%',
    outline: 'none',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#fff',
    color: '#4e54c8',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    width: '100%',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  message: {
    marginTop: '15px',
    textAlign: 'center',
    padding: '10px',
    borderRadius: '8px',
  },
  success: {
    background: '#d4edda',
    color: '#155724',
  },
  error: {
    background: '#f8d7da',
    color: '#721c24',
  },
  registerText: {
    marginTop: '20px',
    textAlign: 'center',
  },
  link: {
    color: '#ffdb58',
    textDecoration: 'underline',
    fontWeight: 'bold',
  }
};

export default StaffLogin;
