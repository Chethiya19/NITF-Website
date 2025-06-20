import React, { useEffect, useState } from "react";
import AdminAuthService from "../../services/AdminAuthService";

const MembersList = () => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      const data = await AdminAuthService.getAllMembers();
      if (Array.isArray(data)) {
        setMembers(data);
      } else {
        setError("Failed to load members");
      }
    };
    fetchMembers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Members List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Member ID</th>
            <th>NIC</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.mid /* or member.id depending on your entity */}>
              <td>{member.mid}</td>
              <td>{member.nic}</td>
              <td>{member.fullName}</td>
              <td>{member.email}</td>
              <td>{member.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MembersList;