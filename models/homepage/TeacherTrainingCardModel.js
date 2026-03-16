const mongoose = require("mongoose");

const TeacherTrainingCardsSchema = new mongoose.Schema({

  number: {
    type: String,
    required: true
  },

  slug: {
    type: String
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
  },

  benefits: [
    {
      mainHeading: String,
      icon: String,
      cardHeading: String,
      cardParagraph: String
    }
  ],

  traditional: [
    {
      heading: String,
      number: String,
      title: String
    }
  ],

  practice: [
    {
      heading: String,
      cardicon: String,
      cardHead: String,
      cardPara: String
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model(
  "TeacherTrainingCards",
  TeacherTrainingCardsSchema
);