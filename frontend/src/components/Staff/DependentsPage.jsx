import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StaffService from '../../services/StaffService';
import { Button, Modal, Form } from 'react-bootstrap';

function DependentsPage() {
  const { memberId } = useParams();
  const [dependents, setDependents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editDependent, setEditDependent] = useState(null);
  const [originalDependent, setOriginalDependent] = useState(null); // for change tracking

  // Message box state
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showMessageBox, setShowMessageBox] = useState(false);
  const messageTimeoutRef = useRef(null);

  const navigate = useNavigate();

  const loadDependents = useCallback(() => {
    setLoading(true);
    setError(null);
    StaffService.getDependentsByMemberId(memberId)
      .then(data => setDependents(data))
      .catch(err => {
        console.error('Error fetching dependents:', err);
        setError('Failed to load dependents.');
      })
      .finally(() => setLoading(false));
  }, [memberId]);

  useEffect(() => {
    loadDependents();
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, [loadDependents]);

  const showMessage = (message, success = true) => {
    if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);

    if (success) {
      setSuccessMessage(message);
      setErrorMessage('');
    } else {
      setErrorMessage(message);
      setSuccessMessage('');
    }
    setShowMessageBox(true);

    messageTimeoutRef.current = setTimeout(() => {
      setShowMessageBox(false);
      setSuccessMessage('');
      setErrorMessage('');
    }, 2500);
  };

  const handleEditClick = (dependent) => {
    setEditDependent(dependent);
    // Save a deep copy of original data for comparison
    setOriginalDependent({
      name: dependent.name || '',
      nic: dependent.nic || '',
      relationship: dependent.relationship || '',
      dob: dependent.dob ? new Date(dependent.dob).toISOString().split('T')[0] : '',
      gender: dependent.gender || '',
    });
    setShowEditModal(true);
  };

  const handleDelete = (dependentId) => {
    if (window.confirm('Are you sure you want to delete this dependent?')) {
      StaffService.deleteDependentById(dependentId)
        .then(() => {
          showMessage('Dependent deleted successfully!', true);
          loadDependents();
        })
        .catch(err => {
          console.error('Error deleting dependent:', err);
          showMessage('Failed to delete dependent.', false);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditDependent(prev => ({ ...prev, [name]: value }));
  };

  // Compare current edited fields with original fields, return true if any change
  const hasChanges = () => {
    if (!editDependent || !originalDependent) return false;
    return (
      (editDependent.name || '') !== originalDependent.name ||
      (editDependent.nic || '') !== originalDependent.nic ||
      (editDependent.relationship || '') !== originalDependent.relationship ||
      (editDependent.dob ? new Date(editDependent.dob).toISOString().split('T')[0] : '') !== originalDependent.dob ||
      (editDependent.gender || '') !== originalDependent.gender
    );
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (!editDependent) return;

    StaffService.updateDependentById(editDependent.did, editDependent)
      .then(() => {
        setShowEditModal(false);
        setEditDependent(null);
        setOriginalDependent(null);
        showMessage('Dependent updated successfully!', true);
        loadDependents();
      })
      .catch(err => {
        console.error('Error updating dependent:', err);
        showMessage('Failed to update dependent.', false);
      });
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };

  return (
    <div className="container mt-4 p-4 bg-white rounded shadow">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Dependents for Member ID: {memberId}</h2>
        <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
      </div>

      {loading && <p>Loading dependents...</p>}
      {!loading && dependents.length === 0 && (
        <div
          className="text-center p-5"
          style={{
            border: '2px dashed #6c757d',
            borderRadius: '12px',
            color: '#6c757d',
            fontStyle: 'italic',
            backgroundColor: '#f8f9fa',
            maxWidth: '500px',
            margin: '30px auto',
          }}
        >
          <div style={{ fontSize: '4rem', marginBottom: '15px' }}>
            <span role="img" aria-label="family emoji">👨‍👩‍👧‍👦</span>
          </div>
          <h4>This member currently has no dependents registered.</h4>
        </div>
      )}

      {!loading && !error && dependents.length > 0 && (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>NIC</th>
              <th>Relationship</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {dependents.map(dep => (
              <tr key={dep.did}>
                <td>{dep.name}</td>
                <td>{dep.nic}</td>
                <td>{dep.relationship}</td>
                <td>{formatDateForInput(dep.dob)}</td>
                <td>{dep.gender}</td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditClick(dep)}
                    title="Edit"
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(dep.did)}
                    title="Delete"
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Dependent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editDependent && (
            <Form onSubmit={handleModalSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={editDependent.name || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formNic">
                <Form.Label>NIC</Form.Label>
                <Form.Control
                  type="text"
                  name="nic"
                  value={editDependent.nic || ''}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formRelationship">
                <Form.Label>Relationship</Form.Label>
                <Form.Select
                  name="relationship"
                  value={editDependent.relationship || ''}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Relationship
                  </option>
                  <option value="Spouse">Spouse</option>
                  <option value="Child">Child</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Daughter">Daughter</option>
                  <option value="Son">Son</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={formatDateForInput(editDependent.dob)}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGender">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={editDependent.gender || ''}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>

              <div className="d-flex justify-content-end">
                <Button variant="secondary" onClick={() => setShowEditModal(false)} className="me-2">
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!hasChanges()}
                  style={{ opacity: hasChanges() ? 1 : 0.5, cursor: hasChanges() ? 'pointer' : 'not-allowed' }}
                >
                  Save Changes
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      {/* Message Box */}
      {showMessageBox && (
        <div
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            padding: '15px 25px',
            backgroundColor: successMessage ? '#4BB543' : '#FF5252',
            color: '#fff',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            zIndex: 1055,
            minWidth: '250px',
            textAlign: 'center',
            fontWeight: 'bold',
            userSelect: 'none',
          }}
        >
          {successMessage || errorMessage}
        </div>
      )}

      <div className="text-center mt-4">
        <Button variant="link" onClick={() => navigate(-1)} style={{ textDecoration: 'none', fontSize: '1.1rem' }}>
          &laquo; Previous Page
        </Button>
      </div>
    </div>
  );
}

export default DependentsPage;
