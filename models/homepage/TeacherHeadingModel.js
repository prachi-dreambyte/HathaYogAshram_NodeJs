const mongoose = require("mongoose");

const teacherHeadingSchema = new mongoose.Schema(
  {
    mainHeading: {
      type: String,
      required: [true, "Main heading is required"],
      trim: true
    },
    subHeading: {
      type: String,
      required: [true, "Sub heading is required"],
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeacherHeading", teacherHeadingSchema);