import React, { useEffect, useState, useRef } from 'react';
import StaffService from '../../services/StaffService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import './Staff.css';


function ManageMembers() {
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentMemberId, setCurrentMemberId] = useState(null);

  // This holds the current form inputs
  const [memberForm, setMemberForm] = useState({
    nic: '',
    fullName: '',
    email: '',
    mobile: '',
    password: '',
  });

  // This holds the original data loaded when editing (or empty for add)
  const [originalMemberForm, setOriginalMemberForm] = useState({
    nic: '',
    fullName: '',
    email: '',
    mobile: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const messageTimeoutRef = useRef(null);

  useEffect(() => {
    fetchMembers();
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  const fetchMembers = () => {
    StaffService.getAllMembers()
      .then(data => setMembers(data))
      .catch(err => console.error('Error fetching members:', err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberForm(prev => ({ ...prev, [name]: value }));
  };

  const showMessage = (message, success = true) => {
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
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
    }, 2000);
  };

  const handleAddClick = () => {
    setEditMode(false);
    setCurrentMemberId(null);

    // Reset form and original form to empty
    const emptyForm = { nic: '', fullName: '', email: '', mobile: '', password: '' };
    setMemberForm(emptyForm);
    setOriginalMemberForm(emptyForm);

    setShowModal(true);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleEditClick = (member) => {
    setEditMode(true);
    setCurrentMemberId(member.mid);

    // Original form: password is always empty for editing (not retrieved)
    const origForm = {
      nic: member.nic,
      fullName: member.fullName,
      email: member.email,
      mobile: member.mobile,
      password: '',
    };

    setMemberForm(origForm);
    setOriginalMemberForm(origForm);
    setShowModal(true);
    setSuccessMessage('');
    setErrorMessage('');
  };

  // Check if any field is changed compared to originalMemberForm
  // For add mode, originalMemberForm is empty so any filled input enables button
  const isFormChanged = () => {
    // For edit: compare each field except password differently
    if (editMode) {
      // password field change means something if filled (non-empty)
      // For other fields compare values strictly
      return (
        memberForm.nic !== originalMemberForm.nic ||
        memberForm.fullName !== originalMemberForm.fullName ||
        memberForm.email !== originalMemberForm.email ||
        memberForm.mobile !== originalMemberForm.mobile ||
        (memberForm.password && memberForm.password.trim() !== '')
      );
    } else {
      // For add mode: if any field is non-empty, form changed
      return (
        memberForm.nic.trim() !== '' ||
        memberForm.fullName.trim() !== '' ||
        memberForm.email.trim() !== '' ||
        memberForm.mobile.trim() !== '' ||
        memberForm.password.trim() !== ''
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        await StaffService.updateMember(currentMemberId, memberForm);
        showMessage('Member updated successfully!', true);
      } else {
        await StaffService.addMember(memberForm);
        showMessage('Member added successfully!', true);
      }
      fetchMembers();

      // Close modal after 2 seconds
      setTimeout(() => setShowModal(false), 2000);
    } catch (error) {
      console.error('Error saving member:', error);
      showMessage('Failed to save member. Please try again.', false);
    }
  };

  const filteredMembers = members.filter(member =>
    member.nic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.mobile.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto p-4 rounded shadow" style={{ backgroundColor: '#fff', maxWidth: '1100px' }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Members</h2>
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by NIC, Name, Mobile or Email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ minWidth: '270px', height: '50px', padding: '5px 10px' }}
          />
          <Button
            variant="primary"
            onClick={handleAddClick}
            style={{ height: '50px', fontSize: '14px', padding: '0 12px' }}
          >
            Add New Member
          </Button>
        </div>
      </div>

      {/* Members Table */}
      <table className="table modern-table">
        <thead className="thead-dark">
          <tr>
            <th>NIC</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No members found</td>
            </tr>
          ) : (
            filteredMembers.map(member => (
              <tr key={member.mid}>
                <td>{member.nic}</td>
                <td>{member.fullName}</td>
                <td>{member.email}</td>
                <td>{member.mobile}</td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <Button variant="warning" size="sm" onClick={() => handleEditClick(member)}>Edit</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Add/Edit Member Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Member' : 'Add New Member'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNIC" className="mb-3">
              <Form.Label>NIC</Form.Label>
              <Form.Control
                type="text"
                name="nic"
                value={memberForm.nic}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formFullName" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={memberForm.fullName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={memberForm.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formMobile" className="mb-3">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                value={memberForm.mobile}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={memberForm.password}
                onChange={handleInputChange}
                placeholder={editMode ? "(Leave blank to keep current password)" : ""}
                required={!editMode} // required only on add
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="mt-2"
              disabled={!isFormChanged()}
              style={{
                opacity: isFormChanged() ? 1 : 0.5,
                transition: 'opacity 0.3s ease',
              }}
            >
              {editMode ? 'Update Member' : 'Add Member'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Message box */}
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
          }}
        >
          {successMessage || errorMessage}
        </div>
      )}
    </div>
  );
}

export default ManageMembers;
