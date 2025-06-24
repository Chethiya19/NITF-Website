import React, { useEffect, useState, useRef } from 'react';
import InstituteService from '../../services/InstituteService';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Institute() {
    const [institutes, setInstitutes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentInstituteId, setCurrentInstituteId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [form, setForm] = useState({ name: '', address: '', contact: '' });
    const [originalForm, setOriginalForm] = useState({ name: '', address: '', contact: '' });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showMessageBox, setShowMessageBox] = useState(false);
    const messageTimeoutRef = useRef(null);

    useEffect(() => {
        fetchInstitutes();
        return () => {
            if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
        };
    }, []);

    const fetchInstitutes = () => {
        InstituteService.getAllInstitutes()
            .then(data => setInstitutes(data))
            .catch(err => console.error('Error fetching institutes:', err));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleAddClick = () => {
        setEditMode(false);
        setCurrentInstituteId(null);
        const emptyForm = { name: '', address: '', contact: '' };
        setForm(emptyForm);
        setOriginalForm(emptyForm);
        setShowModal(true);
    };

    const handleEditClick = (institute) => {
        setEditMode(true);
        setCurrentInstituteId(institute.id);
        const filledForm = { name: institute.name, address: institute.address, contact: institute.contact };
        setForm(filledForm);
        setOriginalForm(filledForm);
        setShowModal(true);
    };

    const isFormChanged = () => {
        if (editMode) {
            return (
                form.name !== originalForm.name ||
                form.address !== originalForm.address ||
                form.contact !== originalForm.contact
            );
        } else {
            return (
                form.name.trim() !== '' ||
                form.address.trim() !== '' ||
                form.contact.trim() !== ''
            );
        }
    };

    const showMessage = (message, success = true) => {
        if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
        setSuccessMessage(success ? message : '');
        setErrorMessage(!success ? message : '');
        setShowMessageBox(true);
        messageTimeoutRef.current = setTimeout(() => {
            setShowMessageBox(false);
            setSuccessMessage('');
            setErrorMessage('');
        }, 2000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                await InstituteService.updateInstitute(currentInstituteId, form);
                showMessage('Institute updated successfully!', true);
            } else {
                await InstituteService.addInstitute(form);
                showMessage('Institute added successfully!', true);
            }
            fetchInstitutes();
            setTimeout(() => setShowModal(false), 2000);
        } catch (error) {
            showMessage('Failed to save institute. Please try again.', false);
        }
    };

    const filteredInstitutes = institutes.filter(i =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.contact.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="mx-auto p-4 rounded shadow" style={{ backgroundColor: '#fff', maxWidth: '1100px' }}>
            <div className="d-flex justify-content-between mb-4">
                <h2>Manage Institutes</h2>
                <div className="d-flex gap-2 align-items-center">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Name, Address, or Contact"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            minWidth: '270px',
                            height: '38px',
                            padding: '6px 10px',
                            fontSize: '14px'
                        }}
                    />
                    <Button
                        variant="primary"
                        onClick={handleAddClick}
                        style={{
                            height: '38px',
                            minWidth: '120px',
                            fontSize: '15px',
                            padding: '6px 16px'
                        }}
                    >
                        Add Institute
                    </Button>
                </div>

            </div>

            <table style={tableStyle} className="table modern-table">
                <thead style={theadStyle}>
                    <tr style={trStyle}>
                        <th style={idThTdStyle}>ID</th>
                        <th style={normalThTdStyle}>Institute Name</th>
                        <th style={normalThTdStyle}>Address</th>
                        <th style={contactThStyle}>Contact</th>
                        <th style={actionsThStyle}>Actions</th>
                    </tr>
                </thead>
            </table>

            <div style={tbodyStyle}>
                <table style={tableStyle} className="table modern-table">
                    <tbody>
                        {filteredInstitutes.length === 0 ? (
                            <tr style={trStyle}>
                                <td colSpan="4" style={{ ...thTdStyle, textAlign: 'center' }}>
                                    No institutes found
                                </td>
                            </tr>
                        ) : (
                            filteredInstitutes.map(inst => (
                                <tr key={inst.id} style={trStyle}>
                                    <td style={idThTdStyle}>{inst.id}</td>
                                    <td style={normalThTdStyle}>{inst.name}</td>
                                    <td style={normalThTdStyle}>{inst.address}</td>
                                    <td style={contactTdStyle}>{inst.contact}</td>
                                    <td style={actionsTdStyle}>
                                        <Button variant="warning" size="sm" onClick={() => handleEditClick(inst)} style={{ padding: '4px 8px' }}>
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>


            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? 'Edit Institute' : 'Add Institute'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Institute Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={form.address}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Contact</Form.Label>
                            <Form.Control
                                type="text"
                                name="contact"
                                value={form.contact}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Button type="submit" variant="primary" disabled={!isFormChanged()}>
                            {editMode ? 'Update' : 'Add'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {showMessageBox && (
                <div style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    padding: '15px 25px',
                    backgroundColor: successMessage ? '#4BB543' : '#FF5252',
                    color: '#fff',
                    borderRadius: '5px',
                    zIndex: 1055,
                    minWidth: '250px',
                    textAlign: 'center',
                    fontWeight: 'bold'
                }}>
                    {successMessage || errorMessage}
                </div>
            )}
        </div>
    );
}

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
};

const theadStyle = {
    display: 'table-header-group',
    position: 'sticky',
    top: 0,
    backgroundColor: '#343a40', 
    color: 'white',
    zIndex: 10,
};

const tbodyStyle = {
    display: 'block',
    maxHeight: '375px', 
    overflowY: 'auto',
    width: '100%',
};

const trStyle = {
    display: 'table',
    width: '100%',
    tableLayout: 'fixed',
};

const thTdStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: '8px',
    borderBottom: '1px solid #dee2e6',
};

const idThTdStyle = {
    ...thTdStyle,
    width: '5%',
};

const actionsTdStyle = {
    textAlign: 'center',
    verticalAlign: 'middle',
    width: '6%',
    padding: '4px 8px',  
};

const normalThTdStyle = {
    ...thTdStyle,
    width: '25%',       
};

const contactTdStyle = {
    ...thTdStyle,
    width: '10%',        
    paddingRight: '1px',
};

const contactThStyle = {
    ...thTdStyle,
    width: '10%',        
    paddingRight: '24px', 
};

const actionsThStyle = {
    ...thTdStyle,
    width: '6%',
    paddingRight: '22px', 
    textAlign: 'center',
};


export default Institute;
