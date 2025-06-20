import React, { useEffect, useState } from 'react';
import MemberService from '../../services/MemberService';
import MemberDetailsService from '../../services/MemberDetailsService';
import { getMemberName } from '../../utils/AuthUtils';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewProfile = () => {
    const [memberProfile, setMemberProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await MemberService.getMemberProfile();
                const fullProfile = await MemberDetailsService.getMemberDetails();
                // Combine or use as needed. Assuming fullProfile contains the data to show
                setMemberProfile({ ...profile, ...fullProfile });
            } catch (err) {
                setError('Failed to fetch member profile. Please login again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <p>Loading profile...</p>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div
            className="mx-auto p-4 rounded shadow"
            style={{ backgroundColor: '#ffffff', maxWidth: '1100px' }}
        >
            <h2 style={{ fontSize: '1.2rem', color: '#0d6efd' }}>
                View Member Profile - {getMemberName()}
            </h2>
            <hr style={{ marginTop: 5, marginBottom: 10 }} />
            {memberProfile && (
                <form>
                    {/* Row 1 */}
                    <div className="row mb-3">
                        <div className="col-md-3">
                            <label className="form-label">NIC</label>
                            <input
                                type="text"
                                className="form-control"
                                value={memberProfile.nic || ''}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Name with Initials</label>
                            <input
                                type="text"
                                className="form-control"
                                value={memberProfile.initials || ''}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={memberProfile.fullName || ''}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Date of Birth</label>
                            <input
                                type="date"
                                className="form-control"
                                value={memberProfile.dob || ''}
                                readOnly
                                disabled
                            />
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="row mb-3">
                        <div className="col-md-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={memberProfile.email || ''}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Mobile</label>
                            <input
                                type="text"
                                className="form-control"
                                value={memberProfile.mobile || ''}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Account Number</label>
                            <input
                                type="text"
                                className="form-control"
                                value={memberProfile.accountNo || ''}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Bank</label>
                            <input
                                type="text"
                                className="form-control"
                                value={memberProfile.bank || ''}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Branch</label>
                            <input
                                type="text"
                                className="form-control"
                                value={memberProfile.branch || ''}
                                readOnly
                                disabled
                            />
                        </div>
                    </div>

                    {/* Row 3 */}
                    <div className="row mb-3">
                        <div className="col-md-3">
                            <label className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                value={memberProfile.address || ''}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">City</label>
                            <input
                                type="text"
                                className="form-control"
                                value={memberProfile.city || ''}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Civil Status</label>
                            <input
                                type="text"
                                className="form-control"
                                value={memberProfile.civilStatus || ''}
                                readOnly
                                disabled
                            />
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ViewProfile;
