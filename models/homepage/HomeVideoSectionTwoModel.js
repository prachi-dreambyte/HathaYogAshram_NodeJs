const mongoose = require("mongoose");

const HomeVideoSectionTwoSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      default: "Deepen and Enhance The Quality of Your Teachings",
    },
    description: {
      type: String,
      default:
        "Our program focuses on refining your techniques, understanding the subtleties of alignment, and mastering the art of effective communication.",
    },
    videoUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "HomeVideoSectionTwo",
  HomeVideoSectionTwoSchema
);
