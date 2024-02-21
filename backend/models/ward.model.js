const mongoose = require("mongoose");

const wardSchema = new mongoose.Schema(
  {
    ward_number: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    specialization: {
      type: String,
    },
  },
  { timestamps: true }
);

const Ward = mongoose.model("Ward", wardSchema);

module.exports = Ward;
