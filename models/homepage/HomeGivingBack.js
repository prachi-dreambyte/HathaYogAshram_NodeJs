const mongoose = require("mongoose");

const homeGivingBackSchema = new mongoose.Schema({
  image: {
    type: [String], // store array of image file paths
    required: true,
  },
  mainHeading: { type: String, required: true },
  subHeading: { type: String, required: true },
  Paragraph: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("HomeGivingBack", homeGivingBackSchema);