const mongoose = require("mongoose");

const RulesRefundSchema = new mongoose.Schema({

  mainHeading: String,

  preTitle: String,
  preDesc1: String,
  preDesc2: String,

  rulesTitle: String,
  rulesDesc1: String,
  rulesDesc2: String,

  refundTitle: String,
  refundDesc1: String,
  refundDesc2: String

}, { timestamps: true });

module.exports = mongoose.model("RulesRefund", RulesRefundSchema);