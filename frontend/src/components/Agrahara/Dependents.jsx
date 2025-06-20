import React, { useState, useEffect } from 'react';
import DependentService from '../../services/DependentService';
import './Agrahara.css';

const DependentsForm = () => {
  const [dependent, setDependent] = useState({
    name: '',
    nic: '',
    dob: '',
    gender: '',
    relationship: '',
  });

  const [errors, setErrors] = useState({});
  const [dependents, setDependents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDependents();
  }, []);

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage(null);
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const fetchDependents = async () => {
    setLoading(true);
    setError(null);
    try {
      let data = await DependentService.getDependents();
      data = data.sort((a, b) => a.did - b.did);
      setDependents(data || []);
    } catch (err) {
      setError(typeof err === 'string' ? err : err.message || 'Failed to fetch dependents');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setDependent({ ...dependent, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const resetForm = () => {
    setDependent({ name: '', nic: '', dob: '', gender: '', relationship: '' });
    setEditingId(null);
    setError(null);
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!dependent.name.trim()) newErrors.name = 'Name is required';
    if (!dependent.dob.trim()) newErrors.dob = 'Date of Birth is required';
    if (!dependent.gender.trim()) newErrors.gender = 'Gender is required';
    if (!dependent.relationship.trim()) newErrors.relationship = 'Relationship is required';
    return newErrors;
  };

  const handleAddOrUpdate = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);
    setError(null);
    try {
      if (editingId) {
        await DependentService.updateDependent(editingId, dependent);
        setMessage('Dependent updated successfully');
      } else {
        await DependentService.addDependent(dependent);
        setMessage('Dependent added successfully');
      }
      await fetchDependents();
      resetForm();
    } catch (err) {
      setError(err?.message || 'Failed to save dependent');
    } finally {
      setSaving(false);
    }
  };

  const handleEditClick = (dep) => {
    setDependent({
      name: dep.name,
      nic: dep.nic,
      dob: dep.dob?.split('T')[0] || '',
      gender: dep.gender,
      relationship: dep.relationship,
    });
    setEditingId(dep.did);
    setError(null);
    setErrors({});
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this dependent?')) {
      try {
        await DependentService.deleteDependent(id);
        setMessage('Dependent deleted successfully');
        await fetchDependents();
      } catch (err) {
        setError(err?.message || 'Failed to delete dependent');
      }
    }
  };

  if (loading) return <p>Loading dependents...</p>;

  return (
    <div className="mx-auto p-4 rounded shadow" style={{ backgroundColor: '#fff', maxWidth: '1100px' }}>
      <h3 className="mb-4">{editingId ? 'Edit Dependent' : 'Add Dependent'}</h3>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-3 align-items-center mb-3">
        <div className="col-md-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Name"
            value={dependent.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="col-md-2">
          <label className="form-label">NIC</label>
          <input
            type="text"
            className={`form-control ${errors.nic ? 'is-invalid' : ''}`}
            placeholder="NIC"
            value={dependent.nic}
            onChange={(e) => handleChange('nic', e.target.value)}
          />
          {errors.nic && <div className="invalid-feedback">{errors.nic}</div>}
        </div>

        <div className="col-md-2">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
            value={dependent.dob}
            onChange={(e) => handleChange('dob', e.target.value)}
          />
          {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
        </div>

        <div className="col-md-2">
          <label className="form-label">Gender</label>
          <select
            className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
            value={dependent.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
          >
            <option value="" disabled>Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
        </div>

        <div className="col-md-2">
          <label className="form-label">Relationship</label>
          <select
            className={`form-select ${errors.relationship ? 'is-invalid' : ''}`}
            value={dependent.relationship}
            onChange={(e) => handleChange('relationship', e.target.value)}
          >
            <option value="" disabled>Relationship</option>
            <option value="Spouse">Spouse</option>
            <option value="Child">Child</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Sibling">Sibling</option>
            <option value="Mother">Daughter</option>
            <option value="Mother">Son</option>
            <option value="Other">Other</option>
          </select>
          {errors.relationship && <div className="invalid-feedback">{errors.relationship}</div>}
        </div>
      </div>

      <div className="d-flex justify-content-end mb-4">
        <button
          type="button"
          className="btn btn-warning"
          onClick={handleAddOrUpdate}
          disabled={saving}
        >
          {saving ? 'Saving...' : editingId ? 'Update Dependent' : 'Add Dependent'}
        </button>
        {editingId && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={resetForm}
            disabled={saving}
          >
            Cancel
          </button>
        )}
      </div>

      <h5 className="mb-3">Your Dependents</h5>
      {dependents.length > 0 ? (
        <table className="table modern-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>NIC</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Relationship</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dependents.map((dep, index) => (
              <tr key={dep.did}>
                <td>{index + 1}</td>
                <td>{dep.name}</td>
                <td>{dep.nic}</td>
                <td>{dep.dob?.split('T')[0]}</td>
                <td>{dep.gender}</td>
                <td>{dep.relationship}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-success me-2"
                    onClick={() => handleEditClick(dep)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteClick(dep.did)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No dependents found.</p>
      )}
    </div>
  );
};

export default DependentsForm;
