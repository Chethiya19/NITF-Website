import axios from 'axios';

const API_URL = 'http://localhost:8080/api/member/'; // Adjust as needed

// Axios instance with credentials enabled (for sending cookies like JWT)
const api = axios.create({
  withCredentials: true,
});

const MemberService = {
  // Get member basic profile (NIC, full name, email, mobile)
  getMemberProfile: async () => {
    try {
      const response = await api.get(API_URL + 'profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update member basic profile
  updateMemberProfile: async (profileData) => {
    try {
      const response = await api.put(API_URL + 'update', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default MemberService;
