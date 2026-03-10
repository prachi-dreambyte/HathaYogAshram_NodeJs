const RulesRefund = require("../../models/AboutUs/RulesRefundForm");


// GET ALL DATA
exports.getRulesRefund = async (req, res) => {

  try {

    const data = await RulesRefund.find().sort({ createdAt: -1 });

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


// CREATE DATA
exports.createRulesRefund = async (req, res) => {

  try {

    const data = new RulesRefund(req.body);

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


// UPDATE DATA
exports.updateRulesRefund = async (req, res) => {

  try {

    const data = await RulesRefund.findByIdAndUpdate(
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


// DELETE DATA
exports.deleteRulesRefund = async (req, res) => {

  try {

    await RulesRefund.findByIdAndDelete(req.params.id);

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