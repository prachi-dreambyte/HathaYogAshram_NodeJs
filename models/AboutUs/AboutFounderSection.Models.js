const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  type: { type: String, enum: ["upload", "link"], default: "upload" },
  url: { type: String },   // full URL for uploaded file OR the pasted link
}, { _id: false });

const AboutFounderSectionSchema = new mongoose.Schema(
  {
    // Journey
    journeyHeading:   { type: String, required: true },
    journeyTitle:     { type: String },
    journeyParagraph: { type: String },

    // Videos
    videoTitle: { type: String },
    videos:     { type: [VideoSchema], default: [] },

    // Last Section
    lastIcon:      { type: String },   // full URL
    lastHeading:   { type: String },
    lastParagraph: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AboutFounderSection", AboutFounderSectionSchema);