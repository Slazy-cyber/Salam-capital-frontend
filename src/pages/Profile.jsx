import React, { useEffect, useState } from "react";
import API from "../api";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({ firstname: "", lastname: "", email: "" });
    const [file, setFile] = useState(null);

    useEffect(() => {
        API.get("/user/me").then((res) => {
            setUser(res.data);
            setForm(res.data);
        });
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
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <h3 className="text-center mb-4">Profile</h3>
            {user && (
                <div className="card p-3 shadow-sm">
                    <div className="text-center">
                        <img
                            src={
                                user.profilePic
                                    ? `http://localhost:5000/${user.profilePic}`
                                    : "https://via.placeholder.com/120"
                            }
                            alt="profile"
                            className="rounded-circle mb-3"
                            width="120"
                            height="120"
                        />
                    </div>

                    <form onSubmit={handleImageUpload} className="text-center mb-3">
                        <input
                            type="file"
                            className="form-control mb-2"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <button className="btn btn-secondary btn-sm" type="submit">
                            Upload Picture
                        </button>
                    </form>

                    {!editMode ? (
                        <div>
                            <p><strong>First Name:</strong> {user.firstname}</p>
                            <p><strong>Last Name:</strong> {user.lastname}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Account Number:</strong> {user.accountNumber}</p>
                            <p><strong>Balance:</strong> ₦{user.balance?.toLocaleString()}</p>
                            <button
                                className="btn btn-primary w-100"
                                onClick={() => setEditMode(true)}
                            >
                                Edit Profile
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleUpdate}>
                            <input
                                className="form-control mb-2"
                                value={form.firstname}
                                onChange={(e) => setForm({ ...form, firstname: e.target.value })}
                            />
                            <input
                                className="form-control mb-2"
                                value={form.lastname}
                                onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                            />
                            <input
                                className="form-control mb-2"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                            <button className="btn btn-success w-100" type="submit">
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
            )}
        </div>
    );
}
