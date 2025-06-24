import axios from "axios";

const API_URL = "http://localhost:8080/api/reports/";

const api = axios.create({
  withCredentials: true,
});

const ReportService = {
  uploadReport: async (file, title) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    const response = await api.post(API_URL + "upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  getReports: async () => {
    const response = await api.get(API_URL + "myreports");
    return response.data;
  },

  getAllReports: async () => {
    const response = await api.get(API_URL + "reports");
    return response.data;
  },

  // Get count of all report
  getReportCount: async () => {
    try {
      const response = await api.get(API_URL + 'count');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get report count of logged member's
  getReportCountForLoggedInMember: async () => {
    try {
      const response = await api.get(API_URL + 'rep-count');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateReport: async (id, updatedReport, file = null) => {
    const formData = new FormData();

    formData.append(
      "report",
      new Blob([JSON.stringify(updatedReport)], { type: "application/json" })
    );

    if (file) {
      formData.append("file", file);
    }

    const response = await api.put(`${API_URL}update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export default ReportService;
