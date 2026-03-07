const mongoose = require("mongoose");

const TeacherTrainingSchema = new mongoose.Schema(
  {
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
    paragraph: {
      type: String,
      required: true,
    },
    video: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "TeacherTraining",
  TeacherTrainingSchema
);