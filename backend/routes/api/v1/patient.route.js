const express = require("express");
const {
  readPatientsHandler,
  createPatientHandler,
  editPatientHandler,
  deletePatientHandler,
} = require("../../../controllers/patient.controller");
const patientRoutes = express.Router();

// GET /api/v1/patients - fetch all patients data
patientRoutes.get("/", readPatientsHandler);

// POST /api/v1/patients - create new patient
patientRoutes.post("/", createPatientHandler);

// POST /api/v1/patients/:patientId - update patient data
patientRoutes.post("/:patientId", editPatientHandler);

// DELETE /api/v1/patients/:patientId - delete patient
patientRoutes.delete("/:patientId", deletePatientHandler);

module.exports = patientRoutes;
