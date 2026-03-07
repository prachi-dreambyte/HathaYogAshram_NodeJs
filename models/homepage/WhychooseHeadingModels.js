const mongoose = require("mongoose");

const whyChooseHeadingSchema = new mongoose.Schema(
  {
    mainHeading: {
      type: String,
      required: true
    },
    subHeading: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "WhyChooseHeading",
  whyChooseHeadingSchema
);