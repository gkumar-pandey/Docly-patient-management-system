const express = require("express");
const routes = express.Router();

routes.use("/api", require("./api"));

routes.get("/", (req, res) => {
  return res.status(200).json("Hello express");
});

module.exports = routes;
