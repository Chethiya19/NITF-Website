import React, { useEffect, useState, useRef } from 'react';
import MemberService from '../../services/MemberService';
import MemberDetailsService from '../../services/MemberDetailsService';
import { getMemberName } from '../../utils/AuthUtils';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditProfile = () => {
  const [memberProfile, setMemberProfile] = useState({
    nic: '',
    initials: '',
    fullName: '',
    dob: '',
    email: '',
    mobile: '',
    accountNo: '',
    bank: '',
    branch: '',
    address: '',
    city: '',
    civilStatus: '',
    id: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const initialProfileRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await MemberService.getMemberProfile();
        const details = await MemberDetailsService.getMemberDetails();
        const dobFormatted = details?.dob ? details.dob.substring(0, 10) : '';

        const combinedProfile = {
          nic: profile.nic || '',
          fullName: profile.fullName || '',
          email: profile.email || '',
          mobile: profile.mobile || '',
          initials: details?.initials || '',
          dob: dobFormatted,
          accountNo: details?.accountNo || '',
          bank: details?.bank || '',
          branch: details?.branch || '',
          address: details?.address || '',
          city: details?.city || '',
          civilStatus: details?.civilStatus || '',
          id: details?.id || null,
        };

        setMemberProfile(combinedProfile);
        initialProfileRef.current = combinedProfile;
        setError(null);
      } catch (err) {
        setError('Failed to load profile. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const isProfileChanged = () => {
    const initial = initialProfileRef.current;
    if (!initial) return false;
    return Object.keys(memberProfile).some(key => memberProfile[key] !== initial[key]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const detailsDTO = {
        id: memberProfile.id,
        initials: memberProfile.initials,
        dob: memberProfile.dob,
        accountNo: memberProfile.accountNo,
        bank: memberProfile.bank,
        branch: memberProfile.branch,
        address: memberProfile.address,
        city: memberProfile.city,
        civilStatus: memberProfile.civilStatus,
      };

      // Update member basic profile (name, email, mobile)
      const memberDTO = {
        nic: memberProfile.nic,
        fullName: memberProfile.fullName,
        email: memberProfile.email,
        mobile: memberProfile.mobile,
      };

      await MemberService.updateMemberProfile(memberDTO);

      // Update or add additional details
      if (memberProfile.id) {
        await MemberDetailsService.updateMemberDetails(detailsDTO);
      } else {
        await MemberDetailsService.addMemberDetails(detailsDTO);
      }

      initialProfileRef.current = { ...memberProfile };
      setSuccess('Profile saved successfully.');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error(err);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  const changed = isProfileChanged();

  return (
    <div className="mx-auto p-4 rounded shadow" style={{ backgroundColor: '#fff', maxWidth: '1100px' }}>
      <h2 style={{ fontSize: '1.2rem', color: '#0d6efd' }}>
        Edit Member Profile - {getMemberName()}
      </h2>
      <hr style={{ marginTop: '5px', marginBottom: '10px' }} />
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">NIC</label>
            <input type="text" className="form-control" name="nic" value={memberProfile.nic} readOnly />
          </div>
          <div className="col-md-3">
            <label className="form-label">Name with Initials</label>
            <input type="text" className="form-control" name="initials" value={memberProfile.initials} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" name="fullName" value={memberProfile.fullName} onChange={handleChange} />
          </div>
          <div className="col-md-2">
            <label className="form-label">Date of Birth</label>
            <input type="date" className="form-control" name="dob" value={memberProfile.dob} onChange={handleChange} />
          </div>
        </div>

        {/* Row 2 */}
        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={memberProfile.email} onChange={handleChange} />
          </div>
          <div className="col-md-2">
            <label className="form-label">Mobile</label>
            <input type="text" className="form-control" name="mobile" value={memberProfile.mobile} onChange={handleChange} />
          </div>
          <div className="col-md-2">
            <label className="form-label">Account Number</label>
            <input type="text" className="form-control" name="accountNo" value={memberProfile.accountNo} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Bank</label>
            <select className="form-control" name="bank" value={memberProfile.bank} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Bank of Ceylon">Bank of Ceylon</option>
              <option value="People's Bank">People's Bank</option>
              <option value="Sampath Bank">Sampath Bank</option>
              <option value="Commercial Bank">Commercial Bank</option>
              <option value="Hatton National Bank">Hatton National Bank</option>
              <option value="National Development Bank">National Development Bank</option>
              <option value="Seylan Bank">Seylan Bank</option>
              <option value="DFCC Bank">DFCC Bank</option>
              <option value="Nations Trust Bank">Nations Trust Bank</option>
              <option value="Pan Asia Bank">Pan Asia Bank</option>
              <option value="Union Bank">Union Bank</option>
              <option value="Amana Bank">Amana Bank</option>
              <option value="Cargills Bank">Cargills Bank</option>
              <option value="HSBC">HSBC</option>
              <option value="Standard Chartered Bank">Standard Chartered Bank</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">Branch</label>
            <input type="text" className="form-control" name="branch" value={memberProfile.branch} onChange={handleChange} />
          </div>
        </div>

        {/* Row 3 */}
        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">Address</label>
            <input type="text" className="form-control" name="address" value={memberProfile.address} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">City</label>
            <input type="text" className="form-control" name="city" value={memberProfile.city} onChange={handleChange} />
          </div>
          <div className="col-md-2">
            <label className="form-label">Civil Status</label>
            <select className="form-control" name="civilStatus" value={memberProfile.civilStatus} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            className="btn btn-success"
            disabled={!changed}
            style={{
              opacity: changed ? 1 : 0.6,
              cursor: changed ? 'pointer' : 'not-allowed',
              transition: 'opacity 0.3s ease',
            }}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
