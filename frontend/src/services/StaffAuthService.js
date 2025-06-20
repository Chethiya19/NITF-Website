// src/services/StaffAuthService.js
import axios from 'axios';
import { saveAuthData, clearAuthData } from '../utils/StaffAuthUtils';

const API_URL = 'http://localhost:8080/api/staff/';

const StaffAuthService = {
  signup: async (nic, fullName, email, mobile, password) => {
    const response = await axios.post(API_URL + 'signup', {
      nic,
      fullName,
      email,
      mobile,
      password,
    });
    return response.data;
  },

  login: async (nic, password) => {
    const response = await axios.post(API_URL + 'login', {
      nic,
      password,
    }, {
      withCredentials: true, // Enable cookies for session auth
    });

    const { fullName, nic: loggedInNic } = response.data;
    saveAuthData(fullName, loggedInNic);
    return response.data;
  },

  logout: async () => {
    await axios.post(API_URL + 'logout', {}, { withCredentials: true });
    clearAuthData();
    return true;
  },
};

export default StaffAuthService;
