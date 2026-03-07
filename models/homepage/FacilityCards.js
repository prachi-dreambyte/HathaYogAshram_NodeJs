const mongoose = require("mongoose");

const HomeFacilityCardSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  heading: {
    type: String,
    required: true
  },
  subParagraph: {
    type: String,
    required: true
  },
  mainParagraph: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("HomeFacilityCard", HomeFacilityCardSchema);