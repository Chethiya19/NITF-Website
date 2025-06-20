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
