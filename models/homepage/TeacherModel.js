const mongoose = require("mongoose");

const teacherNameSchema = new mongoose.Schema(
  {
    teacherName: {
      type: String,
      required: true,
      trim: true
    },
    specialty: {
      type: String,
      required: true,
      trim: true
    },
    subPara: {
      type: String,
      required: true
    },
    experience: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeacherName", teacherNameSchema);