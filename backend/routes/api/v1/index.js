const express = require("express")
const routes = express.Router()

routes.use("/wards",require("./ward.route"))

routes.use("/patients",require("./patient.route"))

module.exports = routes;