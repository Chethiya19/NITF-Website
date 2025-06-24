import axios from 'axios';

const API_URL = 'http://localhost:8080/api/garages/';

const GarageService = {
  getAllGarages: async () => {
    try {
      const response = await axios.get(API_URL + 'list');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  addGarage: async (garageData) => {
    try {
      const response = await axios.post(API_URL + 'add', garageData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default GarageService;
