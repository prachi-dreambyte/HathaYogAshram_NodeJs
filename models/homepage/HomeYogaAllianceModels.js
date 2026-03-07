const mongoose = require("mongoose");

const HomeYogaAllianceSchema = new mongoose.Schema({

  image: [String],

  mainHeading: String,
  subHeading: String,
  Paragraph: String,
  title: String,
  Paragraph1: String

});

module.exports = mongoose.model("HomeYogaAlliance", HomeYogaAllianceSchema);