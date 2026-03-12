import React, { useState, useEffect } from "react";
import "../Patients.css";

function Patients() {
  const [patients, setPatients] = useState([]);

  function getPatients() {
    fetch("http://localhost:3001/patients")
      .then(res => res.json())
      .then(data => setPatients(data))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    getPatients();
    localStorage.setItem("page", "patients");
  }, []);

  function deletePatient(id) {
    fetch(`http://localhost:3001/patients/${id}`, { method: "DELETE" })
      .then(() => getPatients())
      .catch(err => console.error(err));
  }

  function handleBack() {
    localStorage.setItem("page", "data");
    window.location.reload();
  }

  return (

    
    <div className="patientsContainer">

       <div className="hint">
       All documents will be saved in a JSON file using Node.js
      </div>
      <button className="backBtn" onClick={handleBack}>Back</button>

      {patients.length === 0 && <p>No patients found</p>}

      {patients.map((patient) => {
        const today = new Date();
        return (
          <div key={patient.id} className="patientCard">
            <button className="deleteBtn" onClick={() => deletePatient(patient.id)}>X</button>

            <p>Date: {today.toLocaleDateString()}</p>
            <h2>Document NO ID: {patient.id}</h2>
            <p>Firstname: {patient.firstname}</p>
            <p>Lastname: {patient.lastname}</p>
            <p>Age: {patient.age}</p>
            <p>Weight: {patient.weight}</p>
            <p>Medicine: {patient.medicine}</p>
            <p>Disease: {patient.disease}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Patients;