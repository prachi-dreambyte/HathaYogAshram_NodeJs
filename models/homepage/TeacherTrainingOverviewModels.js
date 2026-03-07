const mongoose = require("mongoose");

const TeacherTrainingHeadingSchema = new mongoose.Schema(
  {
    topHeading: {
      type: String,
      required: true,
      trim: true,
    },
    mainHeading: {
      type: String,
      required: true,
      trim: true,
    },
    subHeading: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "TeacherTrainingHeading",
  TeacherTrainingHeadingSchema
);