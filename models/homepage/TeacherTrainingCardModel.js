const mongoose = require("mongoose");

const TeacherTrainingCardsSchema = new mongoose.Schema({

  number: {
    type: String,
    required: true
  },

  icon: {
    type: String,
    required: true
  },

  heading: {
    type: String,
    required: true
  },

  paragraph: {
    type: String,
    required: true
  },

  image: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model(
  "TeacherTrainingCards",
  TeacherTrainingCardsSchema
);