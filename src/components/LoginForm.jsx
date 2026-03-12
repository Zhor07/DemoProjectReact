import React, { useState, useEffect } from "react";
import "../LoginForm.css";
import DataPage from "./DataPage.jsx";
import Patients from "./Patients.jsx";
import Navbar from "./Navbar.jsx";
import "../Navbar.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  const [page, setPage] = useState("data"); 

  useEffect(() => {
    const auth = localStorage.getItem("isAuth");
    if (auth === "true") {
      setIsAuth(true);
    }

    fetch("/Users.json")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  function Exit() {
    localStorage.removeItem("isAuth");
    setIsAuth(false);
    setShowPopup(false);
    setPassword("");
    setUsername("");
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const user = users.find(
      (udata) => udata.username === username && udata.password === password
    );

    if (user) {
      localStorage.setItem("isAuth", "true");
      setIsAuth(true);
    } else {
      setMessage("Login or Password is incorrect");
    }
  }

 
  if (isAuth) {
    return (
      <>
        {}
        <Navbar
          onLogout={Exit}
          goToPatients={() => setPage("patients")}
          goToData={() => setPage("data")}
        />
        <div className="dataContainer">
          <div className="dataWindow">
            {page === "data" && <DataPage />}
            {page === "patients" && <Patients />}
          </div>
        </div>
      </>
    );
  }


  return (
    <>
    {showPopup && (
  <div className="popup-overlay">
    <div className="popup-content">
      <span className="popup-close" onClick={() => setShowPopup(false)}>×</span>
      <h2>Welcome to Demo Project</h2>
      <p>
        This is a demo project for portfolio.<br />
        <b>Login:</b> admin<br />
        <b>Password:</b> admin<br /><br />
        All information and data is fabricated.
      </p>
    </div>
  </div>
)}

      <div className="container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="login">Login</label>
          <input
            id="login"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Submit</button>

          <h2 className="error-massage">{message}</h2>
        </form>
      </div>
    </>
  );
}

export default LoginForm;