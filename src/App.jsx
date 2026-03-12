import { useState, useEffect } from "react";
import React from "react";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import Patients from "./components/Patients";
import "./Navbar.css";

function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState("login");

  useEffect(() => {
    fetch("/Users.json")
      .then((response) => response.json())
      .then((data) => setUsers(data));


    const savedPage = localStorage.getItem("page");
    if (savedPage === "patients") {
      setPage("patients");
    }
  }, []);

  return (
    <div>
      {page === "patients" ? (
        <>
          <Navbar />
          <Patients />
        </>
      ) : (
        <LoginForm users={users} />
      )}
    </div>
  );
}

export default App;