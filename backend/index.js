const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");

const dbConnect = require("./config/db");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
dotenv.config();

dbConnect();

app.use("/", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running at PORT:${PORT}`);
});
