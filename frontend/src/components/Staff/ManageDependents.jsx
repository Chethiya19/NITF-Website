import React, { useEffect, useState } from 'react';
import StaffService from '../../services/StaffService';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';

function MemberDetails() {
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        StaffService.getAllMembers()
            .then(data => {
                setMembers(data);
                setFilteredMembers(data);
            })
            .catch(err => console.error('Error fetching members:', err));
    }, []);

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

    const handleViewDependents = (memberId) => {
        navigate(`/dependents/${memberId}`);
    };

    return (
        <div className="mx-auto p-4 rounded shadow" style={{ backgroundColor: '#fff', maxWidth: '1100px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Dependents of Members</h2>
                <Form.Control
                    type="text"
                    placeholder="Search by NIC, Name, Email or Mobile"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ width: '300px' }}
                />
            </div>

            <table className="table modern-table">
  <thead>
    <tr>
      <th>NIC</th>
      <th>Full Name</th>
      <th>Email</th>
      <th>Mobile</th>
      <th>View Dependents</th>
    </tr>
  </thead>
  <tbody>
    {filteredMembers.length === 0 ? (
      <tr>
        <td colSpan="5" className="text-center">No members found</td>
      </tr>
    ) : (
      filteredMembers.map((member) => (
        <tr key={member.mid}>
          <td>{member.nic}</td>
          <td>{member.fullName}</td>
          <td>{member.email}</td>
          <td>{member.mobile}</td>
          <td>
            <Button
              variant="info"
              size="sm"
              onClick={() => handleViewDependents(member.mid)}
            >
              View
            </Button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>

        </div>
    );
}

export default MemberDetails;
