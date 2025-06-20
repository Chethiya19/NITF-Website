import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); 

    const login = async () => {
        try {
            const res = await axios.post("http://localhost:8080/api/auth/login", {
                email,
                password
            });
            localStorage.setItem("token", res.data);
            alert("Login Successful");
            navigate("/userdashboard"); 
        } catch (err) {
            alert("Login Failed");
        }
    };

    return (
        <div className="login-container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 login-card shadow-lg" style={{ width: "350px" }}>
                <h3 className="text-center mb-4">Login</h3>

                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                />

                {/* Password input with embedded eye icon */}
                <div className="position-relative mb-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <i
                        className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} position-absolute`}
                        style={{
                            top: "50%",
                            right: "10px",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            color: "#6c757d"
                        }}
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </div>

                <button className="btn btn-success w-100" onClick={login}>Login</button>
            </div>
        </div>
    );
}

export default Login;
