const Ward = require("../models/ward.model");

const readAllWardsHandler = async (req, res) => {
  try {
    const wards = await Ward.find({});
    if (!wards) {
      return res
        .status(404)
        .json({ success: false, message: "wards data not found." });
    }

    return res.status(200).json({ success: true, wards: wards });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error.", error });
    throw new Error(error);
  }
};

const createNewWardHandler = async (req, res) => {
  try {
    const wardData = req.body;
    const newWard = new Ward(wardData);
    if (!newWard) {
      return res
        .status(404)
        .json({ success: false, message: "ward not created." });
    }
    await newWard.save();
    return res.status(201).json({
      success: true,
      message: "ward created.",
      ward: newWard,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error.", error });
    throw new Error(error);
  }
};

const editWardHandler = async (req, res) => {
  try {
    const { wardId } = req.params;
    const updatedWardData = req.body;
    const wardFound = await Ward.findById(wardId);
    if (!wardFound) {
      return res
        .status(404)
        .json({ success: false, message: "ward not found." });
    }
    const updatedWard = await Ward.findByIdAndUpdate(wardId, updatedWardData, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "ward updated.",
      ward: updatedWard,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error.", error });
    throw new Error(error);
  }
};

const deleteWardHandler = async (req, res) => {
  try {
    const { wardId } = req.params;
    const wardFound = await Ward.findById(wardId);
    if (!wardFound) {
      return res
        .status(404)
        .json({ success: false, message: "ward not found." });
    }
    await Ward.findByIdAndDelete(wardId);
    return res.status(200).json({ success: true, message: "ward deleted." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error.", error });
    throw new Error(error);
  }
};

module.exports = {
  readAllWardsHandler,
  createNewWardHandler,
  editWardHandler,
  deleteWardHandler,
};
