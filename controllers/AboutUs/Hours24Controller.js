const Hours24 = require("../../models/AboutUs/Hours24Model");


// GET ALL
exports.getHours24 = async (req, res) => {

  try {

    const data = await Hours24.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// CREATE
exports.createHours24 = async (req, res) => {

  try {

    const data = new Hours24(req.body);

    await data.save();

    res.json({
      success: true,
      message: "Data Created",
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// UPDATE
exports.updateHours24 = async (req, res) => {

  try {

    const data = await Hours24.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Data Updated",
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// DELETE
exports.deleteHours24 = async (req, res) => {

  try {

    await Hours24.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Data Deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};