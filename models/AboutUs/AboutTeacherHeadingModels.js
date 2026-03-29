const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  teacherName: String,
  teacherImage: String,
  role: String,
  description: String,
  certification: [String],
  experience: [String],
  expertise: [String],
});

const VideoSchema = new mongoose.Schema({
  video: String,
  thumbnail: String,
});

const AboutTeacherSchema = new mongoose.Schema({
  banner: {
    bannerImage: String,
    mainSubHeading: String,
    heading: String,
  },

  teacherSection: {
    teacherHeading: String,
    teacherMainHeading: String,
    teacherMainPara: String,
    teachers: [TeacherSchema],
  },

  videoSection: {
    videoHeading: String,
    videoMainHeading: String,
    videos: [VideoSchema],
  },
}, { timestamps: true });

module.exports = mongoose.model("AboutTeacher", AboutTeacherSchema);