const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  type: { type: String, enum: ["upload", "link"], default: "upload" },
  url:  { type: String, default: "" },
}, { _id: false });

const AboutTeacherHeadingSchema = new mongoose.Schema(
  {
    // Teacher Section
    mainHeading:    { type: String, required: true },
    subHeading:     { type: String },
    paragraph:      { type: String },

    // Video Section
    videoHeading:    { type: String },
    videoSubHeading: { type: String },
    videos:          { type: [VideoSchema], default: [] },

    // Last Section
    lastHeading:   { type: String },
    lastParagraph: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AboutTeacherHeading", AboutTeacherHeadingSchema);