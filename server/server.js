const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const file = "./patients.json";

// Получить всех пациентов
app.get("/patients", (req, res) => {
  try {
    const data = fs.readFileSync(file, "utf8");
    const patients = JSON.parse(data);
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error reading patients" });
  }
});

// Добавить пациента
app.post("/patients", (req, res) => {
  try {
    const data = fs.readFileSync(file, "utf8");
    const patients = JSON.parse(data);

    const newPatient = {
      id: Date.now(),
      ...req.body
    };

    patients.push(newPatient);

    fs.writeFileSync(file, JSON.stringify(patients, null, 2));

    res.status(201).json(newPatient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving patient" });
  }
});

// Удалить пациента
app.delete("/patients/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    const data = fs.readFileSync(file, "utf8");
    const patients = JSON.parse(data);

    const filteredPatients = patients.filter(p => p.id !== id);

    fs.writeFileSync(file, JSON.stringify(filteredPatients, null, 2));

    res.json({ message: "Patient deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting patient" });
  }
});

app.listen(3001, () => console.log("Server started on port 3001"));