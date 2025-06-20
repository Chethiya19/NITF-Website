import React, { useState } from 'react';
import changePasswordService from '../../services/changePasswordService';

const ChangePassword = () => {
  // Set the user type ('member' or 'staff') – update this as needed
  const userType = 'member'; // or 'staff' depending on the logged-in user

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    try {
      const response = await changePasswordService.changePassword(userType, {
        oldPassword,
        newPassword,
      });
      setMessage(response.data || 'Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data || 'Failed to change password.');
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '400px' }}>
      <h3 className="mb-3">Change Password</h3>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleChangePassword}>
        {/* Old Password */}
        <div className="mb-3 position-relative">
          <label className="form-label">Old Password</label>
          <input
            type={showOldPassword ? 'text' : 'password'}
            className="form-control"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <i
            className={`fa ${showOldPassword ? 'fa-eye-slash' : 'fa-eye'}`}
            onClick={() => setShowOldPassword(!showOldPassword)}
            style={{
              position: 'absolute',
              top: '42px',
              right: '10px',
              cursor: 'pointer',
              color: showOldPassword ? '#000' : '#aaa',
            }}
            aria-label={showOldPassword ? 'Hide old password' : 'Show old password'}
            role="button"
          />
        </div>

        {/* New Password */}
        <div className="mb-3 position-relative">
          <label className="form-label">New Password</label>
          <input
            type={showNewPassword ? 'text' : 'password'}
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <i
            className={`fa ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'}`}
            onClick={() => setShowNewPassword(!showNewPassword)}
            style={{
              position: 'absolute',
              top: '42px',
              right: '10px',
              cursor: 'pointer',
              color: showNewPassword ? '#000' : '#aaa',
            }}
            aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
            role="button"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-3 position-relative">
          <label className="form-label">Confirm New Password</label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <i
            className={`fa ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{
              position: 'absolute',
              top: '42px',
              right: '10px',
              cursor: 'pointer',
              color: showConfirmPassword ? '#000' : '#aaa',
            }}
            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            role="button"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
