const mongoose = require("mongoose");

const faqHeadingSchema = new mongoose.Schema(
  {
    mainHeading: {
      type: String,
      required: [true, "Main heading is required"],
      trim: true,
    },
    subHeading: {
      type: String,
      required: [true, "Sub heading is required"],
      trim: true,
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FaqHeading", faqHeadingSchema);