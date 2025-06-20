import axios from 'axios';

const API_URL = 'http://localhost:8080/api/member-details/';

const api = axios.create({
  withCredentials: true,  
});

const MemberDetailsService = {
  getMemberDetails: async () => {
    try {
      const response = await api.get(API_URL + 'profile');
      return response.data; 
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  addMemberDetails: async (details) => {
    try {
      const response = await api.post(API_URL + 'add', details);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateMemberDetails: async (details) => {
    try {
      const response = await api.put(API_URL + 'update', details);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default MemberDetailsService;
