// src/services/changePasswordService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const changePassword = (userType, passwordData) => {
  let endpoint = '';

  if (userType === 'member') {
    endpoint = `${API_BASE_URL}/member/change-password`;
  } else if (userType === 'staff') {
    endpoint = `${API_BASE_URL}/staff/change-password`;
  } else {
    throw new Error('Invalid user type');
  }

  return axios.post(endpoint, passwordData, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true // to include cookies for JWT/session
  });
};

const changePasswordService = {
  changePassword
};

export default changePasswordService;
