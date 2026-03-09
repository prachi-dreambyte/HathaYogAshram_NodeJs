const mongoose = require("mongoose");

const studentReviewSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  reviewText: {
    type: String,
    required: true
  },
  videoLink: {
    type: String,
    required: true
  },
  img: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model("StudentReview", studentReviewSchema);