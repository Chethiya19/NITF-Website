import React, { useEffect, useState } from "react";
import ReportService from "../../services/ReportsService";
import { FaFilePdf, FaDownload, FaEdit } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";

const ManageReports = () => {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedFile, setUpdatedFile] = useState(null);

  // States for success message
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await ReportService.getAllReports();
      console.log("Reports data:", data); // Debug fetched data
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const handleEditClick = (report) => {
    setSelectedReport(report);
    setUpdatedTitle(report.title ?? "");
    setUpdatedFile(null);
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    setUpdatedFile(e.target.files[0]);
  };

  const handleSave = async () => {
    if (!selectedReport) return;

    try {
      await ReportService.updateReport(selectedReport.id, { title: updatedTitle }, updatedFile);

      setShowModal(false);
      setSuccessMessage("Report updated successfully!");
      setShowMessageBox(true);
      fetchReports();

      // Auto-hide message after 3 seconds
      setTimeout(() => {
        setShowMessageBox(false);
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error updating report:", error);
    }
  };

  const filteredReports = reports.filter((r) =>
    (r.title ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (r.fileName ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (r.memberNic ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (r.memberFullName ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="mx-auto p-4 rounded shadow"
      style={{ backgroundColor: "#fff", maxWidth: "1100px" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-primary">All Uploaded Reports</h4>
        <input
          type="text"
          placeholder="Search reports..."
          className="form-control"
          style={{ maxWidth: "300px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredReports.length === 0 ? (
        <p className="text-muted">No reports uploaded yet.</p>
      ) : (
        <ul className="list-group">
          {filteredReports.map((r) => (
            <li
              key={r.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div style={{ flex: 1 }}>
                <div className="d-flex align-items-center mb-1">
                  <span className="badge bg-secondary me-2">ID: {r.id}</span>
                  <FaFilePdf className="text-danger me-2" />
                  <strong>{r.title ?? "Untitled"}</strong>
                </div>
                <a
                  href={`http://localhost:8080/api/reports/view/${encodeURIComponent(
                    r.fileName ?? ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {r.fileName ?? "No file"}
                </a>
                <br />
                <small className="text-muted">NIC: {r.memberNic ?? "N/A"}</small>
                <br />
                <small className="text-muted">Full Name: {r.memberFullName ?? "N/A"}</small>
              </div>
              <div className="d-flex flex-column gap-2">
                <a
                  href={`http://localhost:8080/api/reports/files/${r.fileName ?? ""}`}
                  download
                  className="btn btn-outline-secondary btn-sm"
                  title="Download"
                >
                  <FaDownload className="me-1" />
                  Download
                </a>
                <button
                  className="btn btn-outline-success btn-sm"
                  title="Edit Report"
                  onClick={() => handleEditClick(r)}
                >
                  <FaEdit className="me-1" />
                  Edit Report
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal for editing */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formReportTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formFile">
              <Form.Label>Choose New File (optional)</Form.Label>
              <Form.Control type="file" accept=".pdf" onChange={handleFileChange} />
              {selectedReport && (
                <Form.Text className="text-muted">
                  Current file: <strong>{selectedReport.fileName ?? "N/A"}</strong>
                </Form.Text>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Message Box */}
      {showMessageBox && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            padding: "15px 25px",
            backgroundColor: "#4BB543",
            color: "#fff",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            zIndex: 1050,
          }}
        >
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default ManageReports;
