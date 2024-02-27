const Patient = require("../models/patient.model");

const readPatientsHandler = async (req, res) => {
  try {
    const patients = await Patient.find({}).populate({
      path: "ward",
      select: "ward_number",
    });
    if (!patients) {
      return res
        .status(404)
        .json({ success: false, message: "Patients data not found." });
    }

    return res.status(200).json({ success: true, patients: patients });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
    throw new Error(error);
  }
};

const createPatientHandler = async (req, res) => {
  try {
    const patientData = req.body;
    const newPatient = new Patient(patientData);
    if (!newPatient) {
      return res
        .status(404)
        .json({ success: false, message: "patient not created." });
    }
    await newPatient.save();
    await newPatient.populate({ path: "ward", select: "ward_number" });
    return res.status(201).json({
      success: true,
      message: "patient created.",
      patient: newPatient,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error.", error });
    throw new Error(error);
  }
};

const editPatientHandler = async (req, res) => {
  try {
    const { patientId } = req.params;
    const updatedData = req.body;
     
    const patientFound = await Patient.findById(patientId);
    if (!patientFound) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found." });
    }
    const updatedPatient = await Patient.findByIdAndUpdate(
      patientId,
      updatedData,
      { new: true }
    );
    
    return res.status(200).json({
      success: true,
      message: "Patient updated.",
      patient: updatedPatient,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error.", error });
    throw new Error(error);
  }
};

const deletePatientHandler = async (req, res) => {
  try {
    const { patientId } = req.params;
    const patientFound = await Patient.findById(patientId);
    if (!patientFound) {
      return res
        .status(404)
        .json({ success: false, message: "patient not found." });
    }
    await Patient.findByIdAndDelete(patientId);
    return res.status(200).json({ success: true, message: "Patient deleted." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error.", error });
    throw new Error(error);
  }
};

module.exports = {
  readPatientsHandler,
  createPatientHandler,
  editPatientHandler,
  deletePatientHandler,
};
