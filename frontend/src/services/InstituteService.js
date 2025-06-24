import axios from 'axios';

const API_URL = 'http://localhost:8080/api/institute/';

const api = axios.create({
  withCredentials: true,
});

const InstituteService = {
  getAllInstitutes: async () => {
    try {
      const response = await api.get(API_URL + 'list');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  addInstitute: async (instituteData) => {
    try {
      const response = await api.post(API_URL + 'add', instituteData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateInstitute: async (id, instituteData) => {
    try {
      const response = await api.put(API_URL + `update/${id}`, instituteData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default InstituteService;
