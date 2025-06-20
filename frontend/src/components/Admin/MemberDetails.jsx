import React, { useEffect, useState } from "react";
import AdminAuthService from "../../services/AdminAuthService";

const MemberDetails = ({ memberId }) => {
  const [member, setMember] = useState(null);
  const [dependents, setDependents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMemberDetails = async () => {
      const data = await AdminAuthService.getMemberById(memberId);
      if (data && !data.message) {
        setMember(data);
      } else {
        setError(data.message || "Member not found");
      }
    };

    const fetchDependents = async () => {
      const data = await AdminAuthService.getDependentsByMemberId(memberId);
      if (Array.isArray(data)) {
        setDependents(data);
      } else {
        setError(data.message || "No dependents found");
      }
    };

    fetchMemberDetails();
    fetchDependents();
  }, [memberId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!member) {
    return <p>Loading member details...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Member Details</h2>
      <p><strong>ID:</strong> {member.id}</p>
      <p><strong>Name:</strong> {member.fullName || member.username}</p>
      <p><strong>Email:</strong> {member.email}</p>
      {/* Add other member fields here */}

      <h3>Dependents</h3>
      {dependents.length === 0 ? (
        <p>No dependents found.</p>
      ) : (
        <ul>
          {dependents.map((dep) => (
            <li key={dep.id}>
              {dep.name} ({dep.relationship})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MemberDetails;
