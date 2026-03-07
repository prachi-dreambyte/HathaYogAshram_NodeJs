const mongoose = require("mongoose");

const section1Schema = new mongoose.Schema(
  {
    mainHeading: String,
    subHeading: String,
    heading1: String,
    paragraph: String,
    img1: String,
    img2: String,
    img3: String,
    img4: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Section1", section1Schema);