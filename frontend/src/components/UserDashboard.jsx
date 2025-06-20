import React, { useEffect, useState } from "react";

function UserDashboard() {
  const [email, setEmail] = useState("");

  // Function to decode JWT payload
  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = parseJwt(token);
      if (decoded && decoded.sub) {
        setEmail(decoded.sub); // assuming 'sub' is the email/username
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <header className="bg-primary text-white p-3 d-flex justify-content-between align-items-center">
        <h2>Welcome, {email || "User"}!</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="d-flex flex-grow-1">
        <nav
          className="bg-dark text-white p-3"
          style={{ width: "250px", minHeight: "100%" }}
        >
          <ul className="nav flex-column">
            <li className="nav-item mb-3">
              <button
                className="nav-link btn btn-link text-white p-0"
                style={{ textDecoration: "none" }}
              >
                Dashboard
              </button>
            </li>
            <li className="nav-item mb-3">
              <button
                className="nav-link btn btn-link text-white p-0"
                style={{ textDecoration: "none" }}
              >
                Profile
              </button>
            </li>
            <li className="nav-item mb-3">
              <button
                className="nav-link btn btn-link text-white p-0"
                style={{ textDecoration: "none" }}
              >
                Settings
              </button>
            </li>
          </ul>
        </nav>

        <main className="flex-grow-1 p-4 bg-light">
          <h3>Your Dashboard Content</h3>
          <p>This is where you can display your user-specific data and widgets.</p>
        </main>
      </div>

      <footer className="bg-secondary text-white text-center p-2">
        &copy; 2025 My Company
      </footer>
    </div>
  );
}

export default UserDashboard;
