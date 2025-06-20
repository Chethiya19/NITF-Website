import axios from "axios";

const API_URL = "http://localhost:8080/api/admin";

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data; // { message: "Login successful" } or error messages
  } catch (error) {
    // Return error response data if available, otherwise generic message
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { message: "Login failed" };
  }
};

const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    return response.data; // { message: "Admin registered successfully" } or error messages
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { message: "Registration failed" };
  }
};

const getAllMembers = async () => {
  try {
    const response = await axios.get(`${API_URL}/members`);
    return response.data; // Array of members
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return [];
  }
};

const getMemberById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/members/${id}`);
    return response.data; // Member object or error message
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { message: "Failed to get member details" };
  }
};

const getDependentsByMemberId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/members/${id}/dependents`);
    return response.data; // Array of dependents
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return [];
  }
};

const AdminAuthService = {
  login,
  register,
  getAllMembers,
  getMemberById,
  getDependentsByMemberId,
};

export default AdminAuthService;
