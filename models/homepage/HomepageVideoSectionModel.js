const mongoose = require("mongoose");

const homeVideoSectionSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: [true, "Heading is required"],
      trim: true,
    },
    paragraph: {
      type: String,
      required: [true, "Paragraph is required"],
      trim: true,
    },
    video: {
      type: String,
      required: [true, "Video is required"],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("HomeVideoSection", homeVideoSectionSchema);