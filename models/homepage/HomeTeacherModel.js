const mongoose = require("mongoose");

const HomeTeacherSchema = new mongoose.Schema(
  {
    mainHeading: String,
    subHeading: String,
    heading1: String,
    paragraph: String,
    img: String,
    teacherName: String,
    specialty: String,
    subPara: String,
    experience: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "HomeTeacher",
  HomeTeacherSchema
);