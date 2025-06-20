import React, { useState, useEffect } from "react";
import ReportService from '../../services/ReportsService';
import { FaFilePdf, FaDownload, FaUpload } from "react-icons/fa";

const ReportUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [reports, setReports] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await ReportService.getReports();
      setReports(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      setMessage("Please select a file and enter a title.");
      return;
    }

    try {
      await ReportService.uploadReport(file, title);
      setMessage("Upload successful!");
      setFile(null);
      setTitle("");
      fetchReports();
    } catch (err) {
      console.error(err);
      setMessage("Upload failed.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Upload Form */}
        <div className="col-md-6">
          <div className="p-3 rounded shadow" style={{ backgroundColor: "#fff" }}>
            <h4 className="mb-4 text-primary">
              <FaUpload className="me-2" />
              Upload Your Report
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Enter report title"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Select PDF File</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                  accept="application/pdf"
                  required
                />
              </div>
              <button type="submit" className="btn btn-success">
                <FaUpload className="me-2" />
                Upload
              </button>
            </form>

            {message && (
              <div className="alert alert-info mt-3" role="alert">
                {message}
              </div>
            )}
          </div>
        </div>

        {/* Report List */}
        <div className="col-md-6">
          <div className="p-3 rounded shadow" style={{ backgroundColor: "#fff", minHeight: "100%" }}>
            <h5 className="text-success mb-3">Your Reports</h5>
            {reports.length === 0 ? (
              <p className="text-muted">No reports uploaded yet.</p>
            ) : (
              <ul className="list-group">
                {reports.map((r) => (
                  <li
                    key={r.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <FaFilePdf className="text-danger me-2" />
                      <strong>{r.title}</strong>
                      <br />
                      <a
                        href={`http://localhost:8080/api/reports/view/${encodeURIComponent(
                          r.fileName
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {r.fileName}
                      </a>
                    </div>
                    <a
                      href={`http://localhost:8080/api/reports/files/${r.fileName}`}
                      download
                      className="btn btn-outline-secondary btn-sm"
                    >
                      <FaDownload className="me-1" />
                      Download
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportUpload;
