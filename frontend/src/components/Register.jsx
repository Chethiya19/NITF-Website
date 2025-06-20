import React, { useState } from "react";
import axios from "axios";
import "./Register.css"; 
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });

    const register = async () => {
        try {
            await axios.post("http://localhost:8080/api/auth/register", form);
            alert("Registered Successfully!");
        } catch (err) {
            alert("Registration Failed!");
        }
    };

    return (
        <div className="register-container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 register-card shadow-lg">
                <h3 className="text-center mb-4">Create Account</h3>
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Username"
                    onChange={e => setForm({ ...form, username: e.target.value })}
                />
                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />
                <input
                    type="password"
                    className="form-control mb-4"
                    placeholder="Password"
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <button className="btn btn-primary w-100" onClick={register}>Register</button>
            </div>
        </div>
    );
}

export default Register;
