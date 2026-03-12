import React, { useState } from "react";
import "../DataPage.css";

function DataPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [med, setMed] = useState("");
  const [disease, setDisease] = useState("");
  const [popup, setPopup] = useState({ show: false, message: "", type: "success" });

  function showPopup(message, type = "success") {
    setPopup({ show: true, message, type });
    setTimeout(() => setPopup({ show: false, message: "", type }), 3000);
  }

  function calculateMedicine(a, w, d) {
    const numericAge = Number(a);
    const numericWeight = Number(w);
    let medicine = "";

    if (d === "disease 1") {
      medicine = numericAge > 60 || numericWeight > 90 ? "Med A" : "Med B";
    } else if (d === "disease 2") {
      medicine = numericAge > 50 && numericWeight > 80 ? "Med C" : "Med D";
    } else if (d === "disease 3") {
      medicine = numericWeight > 70 ? "Med E" : "Med F";
    } else {
      medicine = "Med Default";
    }

    return medicine;
  }

  function calculate() {
    if (!firstname || !lastname || !age || !weight || !disease) {
      showPopup("Please fill in all fields before calculating!", "error");
      return;
    }
    const medicine = calculateMedicine(age, weight, disease);
    setMed(medicine);
  }

  function addPatient() {
    if (!firstname || !lastname || !age || !weight || !disease) {
      showPopup("Please fill in all fields before adding patient!", "error");
      return;
    }

    const medicine = calculateMedicine(age, weight, disease);

    const patient = {
      id: Date.now(),
      firstname,
      lastname,
      age,
      weight,
      disease,
      medicine
    };

    fetch("http://localhost:3001/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient)
    })
      .then(res => res.json())
      .then(() => {
        showPopup("Patient added successfully!", "success");
        setFirstname("");
        setLastname("");
        setAge("");
        setWeight("");
        setDisease("");
        setMed("");
      })
      .catch(err => showPopup("Error adding patient!", "error"));
  }

  return (
    <div className="dataPageContainer">
      <div className="hint">
        This section calculates the medicine a patient needs (using a fake algorithm) and can create a document automatically. 
        All documents are saved on the Documents page (see Navbar)..
      </div>

      <div className="innerContainer">
        <div className="leftPanel">
          <label>Patient Firstname</label>
          <input value={firstname} onChange={e => setFirstname(e.target.value)} />

          <label>Patient Lastname</label>
          <input value={lastname} onChange={e => setLastname(e.target.value)} />

          <label>Patient Age</label>
          <input type="number" value={age} onChange={e => setAge(e.target.value)} />

          <label>Patient Weight</label>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)} />

          <label>Disease Type</label>
          <select value={disease} onChange={e => setDisease(e.target.value)}>
            <option value="">Choose a disease</option>
            <option value="disease 1">Type 1</option>
            <option value="disease 2">Type 2</option>
            <option value="disease 3">Type 3</option>
          </select>
        </div>

        <div className="rightPanel">
          <h3>Firstname: {firstname}</h3>
          <h3>Lastname: {lastname}</h3>
          <h3>Age: {age}</h3>
          <h3>Weight: {weight}</h3>
          <h3>Disease: {disease}</h3>
          <h3>Medicine: {med}</h3>

          <button className="calculateBtn" onClick={calculate}>Calculate</button>
          <button className="addBtn" onClick={addPatient}>Auto Document Creator!</button>
        </div>
      </div>

      {popup.show && (
        <div className={`popup ${popup.type}`}>
          {popup.message}
        </div>
      )}
    </div>
  );
}

export default DataPage;