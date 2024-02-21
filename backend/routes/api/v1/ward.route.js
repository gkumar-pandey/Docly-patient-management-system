const express = require("express");
const {
  readAllWardsHandler,
  createNewWardHandler,
  editWardHandler,
  deleteWardHandler,
} = require("../../../controllers/ward.controller");
const wardRoutes = express.Router();

// GET /api/v1/wards - fetch all wards
wardRoutes.get("/", readAllWardsHandler);

// POST /api/v1/wards - create new ward
wardRoutes.post("/", createNewWardHandler);

// POST /api/v1/wards/:wardId - Edit ward data
wardRoutes.post("/:wardId", editWardHandler);

// DELETE /api/v1/ward/:wardId - delete a ward
wardRoutes.delete("/:wardId", deleteWardHandler);

module.exports = wardRoutes;
