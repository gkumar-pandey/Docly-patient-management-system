const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");

const dbConnect = require("./config/db");
const routes = require("./routes");
const {
  globalErrorHandlerMiddleware,
  pageNotFoundErrorHandlerMiddleware,
} = require("./middleware");

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
dotenv.config();

dbConnect();
const PORT = process.env.PORT || 5000;

app.use("/", routes);
app.use(globalErrorHandlerMiddleware);
app.use(pageNotFoundErrorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`server is running at PORT:${PORT}`);
});
