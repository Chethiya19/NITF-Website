import axios from 'axios';

const API_URL = 'http://localhost:8080/api/dependents/';

const api = axios.create({
  withCredentials: true,
});

const DependentService = {
  getDependents: async () => {
    try {
      const response = await api.get(API_URL + 'list');
      if (response.data.code === '00') {
        return response.data.content; 
      } else {
        throw new Error(response.data.message || 'Failed to fetch dependents');
      }
    } catch (error) {
      console.error('Error fetching dependents:', error);
      throw error;
    }
  },

  addDependent: async (dependent) => {
    try {
      const response = await api.post(API_URL + 'add', dependent);
      if (response.data.code === '00') {
        return response.data.content; 
      } else {
        throw new Error(response.data.message || 'Failed to add dependent');
      }
    } catch (error) {
      console.error('Error adding dependent:', error);
      throw error;
    }
  },

  updateDependent: async (dependentId, dependent) => {
    try {
      const response = await api.put(API_URL + `update/${dependentId}`, dependent);
      if (response.data.code === '00') {
        return response.data.content; 
      } else {
        throw new Error(response.data.message || 'Failed to update dependent');
      }
    } catch (error) {
      console.error('Error updating dependent:', error);
      throw error;
    }
  },

  deleteDependent: async (dependentId) => {
    try {
      const response = await api.delete(API_URL + `delete/${dependentId}`);
      if (response.data.code === '00') {
        return response.data.message; 
      } else {
        throw new Error(response.data.message || 'Failed to delete dependent');
      }
    } catch (error) {
      console.error('Error deleting dependent:', error);
      throw error;
    }
  }
};

export default DependentService;
