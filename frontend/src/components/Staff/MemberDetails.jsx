import React, { useEffect, useState } from 'react';
import StaffService from '../../services/StaffService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

function MemberDetails() {
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMemberDetails, setSelectedMemberDetails] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = () => {
        StaffService.getAllMembers()
            .then(data => {
                setMembers(data);
                setFilteredMembers(data);
            })
            .catch(err => console.error('Error fetching members:', err));
    };

    const handleViewClick = async (memberId) => {
        try {
            const details = await StaffService.getMemberDetailsByMemberId(memberId);
            setSelectedMemberDetails(details);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching member details:', error);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = members.filter(member =>
            member.nic.toLowerCase().includes(value) ||
            member.fullName.toLowerCase().includes(value) ||
            member.email.toLowerCase().includes(value) ||
            member.mobile.toLowerCase().includes(value)
        );
        setFilteredMembers(filtered);
    };

    return (
        <div className="mx-auto p-4 rounded shadow" style={{ backgroundColor: '#fff', maxWidth: '1100px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Member Details</h2>
                <Form.Control
                    type="text"
                    placeholder="Search by NIC, Name, Email or Mobile"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ width: '300px' }}
                />
            </div>

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
                                    <Button
                                        variant="info"
                                        size="sm"
                                        onClick={() => handleViewClick(member.mid)}
                                    >
                                        View
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Member Detailed Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedMemberDetails ? (
                        <div>
                            <p><strong>Initials:</strong> {selectedMemberDetails.initials}</p>
                            <p><strong>Date of Birth:</strong> {selectedMemberDetails.dob}</p>
                            <p><strong>Account No:</strong> {selectedMemberDetails.accountNo}</p>
                            <p><strong>Bank:</strong> {selectedMemberDetails.bank}</p>
                            <p><strong>Branch:</strong> {selectedMemberDetails.branch}</p>
                            <p><strong>Address:</strong> {selectedMemberDetails.address}</p>
                            <p><strong>City:</strong> {selectedMemberDetails.city}</p>
                            <p><strong>Civil Status:</strong> {selectedMemberDetails.civilStatus}</p>
                        </div>
                    ) : (
                        <p>No detailed information available for this member.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default MemberDetails;
