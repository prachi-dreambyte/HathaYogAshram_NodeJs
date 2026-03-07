const mongoose = require("mongoose");

const Section1Schema = new mongoose.Schema(
  {
    mainHeading: {
      type: String,
      required: true,
      trim: true,
    },
    subHeading: {
      type: String,
      trim: true,
    },
    heading1: {
      type: String,
      trim: true,
    },
    paragraph: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Section1 ||
  mongoose.model("Section1", Section1Schema);