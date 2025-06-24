import React, { useEffect, useState } from 'react';
import ReportService from '../services/ReportsService';
import { FaFilePdf, FaDownload, FaEye } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Downloads = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState({ view: null, download: null });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await ReportService.getAllReports();
      setReports(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const btnViewBase = {
    background: 'linear-gradient(to right, #3498db, #2980b9)',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    padding: '6px 16px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
  };

  const btnDownloadBase = {
    background: 'linear-gradient(to right, #2ecc71, #27ae60)',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    padding: '6px 16px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
  };

  const btnViewHover = {
    background: 'linear-gradient(to right, #2980b9, #2471a3)',
    color: '#e0e0e0',
    transform: 'scale(1.05)',
    filter: 'brightness(1.1)',
  };

  const btnDownloadHover = {
    background: 'linear-gradient(to right, #27ae60, #229954)',
    color: '#d0ffd0',
    transform: 'scale(1.05)',
    filter: 'brightness(1.1)',
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <p>Loading reports...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 style={{
          background: 'linear-gradient(to right, #2ecc71, #27ae60)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
          paddingTop: '60px',
        }}>
          <span role="img" aria-label="document">📂</span> Download Reports
        </h2>
        <p className="text-muted">Access, view and download all NITF documents.</p>
      </div>

      {reports.length === 0 ? (
        <p className="text-muted text-center">No reports available to download.</p>
      ) : (
        <div className="row">
          {reports.map((report, index) => (
            <div
              className="col-md-4 mb-4"
              key={report.id}
              style={{
                animation: `fadeIn 0.5s ease ${(index + 1) * 0.1}s both`,
              }}
            >
              <div
                className="card shadow border-0 h-100"
                style={{
                  transition: 'transform 0.3s ease',
                  borderRadius: '16px',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
              >
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title text-success d-flex align-items-center gap-2">
                      <FaFilePdf style={{ fontSize: '48px', color: '#dc3545' }} />
                      {report.title}
                    </h5>
                    <p className="text-muted small">
                      <strong>File:</strong> {report.fileName}
                    </p>
                  </div>
                  <div className="mt-4 d-flex justify-content-between">
                    <a
                      href={`http://localhost:8080/api/reports/view/${encodeURIComponent(report.fileName)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm"
                      style={{
                        ...btnViewBase,
                        ...(hovered.view === report.id ? btnViewHover : {}),
                      }}
                      onMouseEnter={() => setHovered(h => ({ ...h, view: report.id }))}
                      onMouseLeave={() => setHovered(h => ({ ...h, view: null }))}
                    >
                      <FaEye className="me-2" /> View
                    </a>
                    <a
                      href={`http://localhost:8080/api/reports/files/${report.fileName}`}
                      download
                      className="btn btn-sm"
                      style={{
                        ...btnDownloadBase,
                        ...(hovered.download === report.id ? btnDownloadHover : {}),
                      }}
                      onMouseEnter={() => setHovered(h => ({ ...h, download: report.id }))}
                      onMouseLeave={() => setHovered(h => ({ ...h, download: null }))}
                    >
                      <FaDownload className="me-2" /> Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Downloads;
