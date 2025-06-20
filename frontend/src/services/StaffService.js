import axios from 'axios';

const API_URL = 'http://localhost:8080/api/staff/';

const api = axios.create({
  withCredentials: true,
});

const StaffService = {
  getStaffProfile: async () => {
    const response = await api.get(API_URL + 'profile');
    return response.data;
  },

  getAllMembers: async () => {
    const response = await api.get(API_URL + 'members');
    return response.data;
  },

  addMember: async (memberData) => {
    const response = await api.post(API_URL + 'add-member', memberData);
    return response.data;
  },

  updateMember: async (memberId, memberData) => {
    const response = await api.put(`${API_URL}update-member/${memberId}`, memberData);
    return response.data;
  },

  getMemberDetailsByMemberId: async (memberId) => {
    const response = await api.get(`${API_URL}member-details/${memberId}`);
    return response.data;
  },

  getDependentsByMemberId: async (memberId) => {
    const response = await api.get(`${API_URL}dependents/${memberId}`);
    return response.data;
  },

  // ✅ Update dependent (using controller: PUT /dependents/{id})
  updateDependentById: async (dependentId, dependentData) => {
    const response = await api.put(`${API_URL}dependents/${dependentId}`, dependentData);
    return response.data;
  },

  // ✅ Delete dependent (using controller: DELETE /dependents/{id})
  deleteDependentById: async (dependentId) => {
    const response = await api.delete(`${API_URL}dependents/${dependentId}`);
    return response.data;
  },
};

export default StaffService;
