
import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [debugVisible, setDebugVisible] = useState(false);
    const [lastResponse, setLastResponse] = useState(null);
    const [lastErrorDetails, setLastErrorDetails] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
    const [file, setFile] = useState(null);

    const fetchUser = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await API.get("/users/me");
            setUser(res.data);
            setForm(res.data);
            setLastResponse(res);
        } catch (err) {
            console.error("Failed to fetch /users/me:", err, err?.response?.config?.url);
            setLastErrorDetails(err?.response || { message: err.message });

            const msg = err?.response?.data?.message || err.message || "Failed to load profile";
            setError(msg);


            setError(msg);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        await API.put("/user/update", form);
        alert("Profile updated successfully!");
        setEditMode(false);
    };

    const handleImageUpload = async (e) => {
        const formData = new FormData();
        formData.append("profilePic", file);
        await API.post("/user/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Profile picture updated!");
        window.location.reload();
    };

    return (
        <div className="profile-container">
            <h3 className="text-center mb-4" style={{ color: '#1db954', fontWeight: 700 }}>My Profile</h3>
            {loading ? (
                <div className="text-center">Loading profile...</div>
            ) : error ? (
                <div className="text-center">
                    <div style={{ color: "#b00020", marginBottom: 8 }}>{error}</div>
                    <button className="btn btn-outline-primary btn-sm" onClick={fetchUser}>Retry</button>
                    <button className="btn btn-link" onClick={() => navigate('/login')}>Go to Login</button>
                </div>
            ) : user ? (
                <div>

                    <div className="text-center">
                        <img
                            src={
                                user.profilePic
                                    ? `http://localhost:5000/${user.profilePic}`
                                    : "https://via.placeholder.com/150"
                            }
                            alt="profile"
                            className="profile-avatar"
                        />
                        <div className="profile-picture-section">
                            <form onSubmit={handleImageUpload} className="mb-3">
                                <div className="upload-btn-wrapper">
                                    <button className="btn btn-outline-primary btn-sm" type="button" onClick={() => document.getElementById('profile-photo-input').click()}>
                                        Choose New Photo
                                    </button>
                                    <input
                                        id="profile-photo-input"
                                        type="file"
                                        accept="image/*"
                                        className="form-control"
                                        style={{ display: 'none' }}
                                        onChange={(e) => {
                                            setFile(e.target.files[0]);
                                            if (e.target.files[0]) {
                                                const reader = new FileReader();
                                                reader.onload = (e) => {
                                                    document.querySelector('.profile-avatar').src = e.target.result;
                                                };
                                                reader.readAsDataURL(e.target.files[0]);
                                            }
                                        }}
                                    />
                                </div>
                                {file && (
                                    <button className="profile-upload-btn mt-2" type="submit">
                                        Update Profile Picture
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>

                    {!editMode ? (
                        <div className="profile-info">
                            <div className="profile-section">
                                <h4>Personal Information</h4>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <label>First Name</label>
                                        <p>{user.firstName}</p>
                                    </div>
                                    <div className="info-item">
                                        <label>Last Name</label>
                                        <p>{user.lastName}</p>
                                    </div>
                                    <div className="info-item">
                                        <label>Email</label>
                                        <p>{user.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="profile-section">
                                <h4>Account Information</h4>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <label>Account Number</label>
                                        <p className="highlight">{user.accountNumber}</p>
                                    </div>
                                    <div className="info-item">
                                        <label>Current Balance</label>
                                        <p className="highlight">₦{user.balance?.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="profile-edit-btn"
                                onClick={() => setEditMode(true)}
                            >
                                Edit Profile
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleUpdate}>
                            <input
                                className="form-control mb-2"
                                value={form.firstName}
                                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                placeholder="First Name"
                            />
                            <input
                                className="form-control mb-2"
                                value={form.lastName}
                                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                                placeholder="Last Name"
                            />
                            <input
                                className="form-control mb-2"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                placeholder="Email"
                            />
                            <button className="profile-edit-btn" type="submit">
                                Save Changes
                            </button>
                            <button
                                className="btn btn-secondary w-100 mt-2"
                                onClick={() => setEditMode(false)}
                                type="button"
                            >
                                Cancel
                            </button>
                        </form>
                    )}



                </div>
            ) : (
                <div className="text-center">
                    <div>Not logged in or no profile data available.</div>
                    <button className="btn btn-outline-primary btn-sm mt-2" onClick={fetchUser}>Retry</button>
                    <button className="btn btn-link" onClick={() => navigate('/login')}>Go to Login</button>
                </div>
            )}
        </div>
    );
}
