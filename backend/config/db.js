const mongoose = require("mongoose");

const dbConnect = async () => {
  const DB_USER = process.env.DB_USER;
  const DB_PASSWORD = process.env.DB_PASSWORD;
  const DB_URL = "";
  try {
    const connect = await mongoose.connect(DB_URL);
    console.log("Database connected successfully...")
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = dbConnect;
