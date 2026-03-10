const mongoose = require("mongoose");

const Hours24Schema = new mongoose.Schema({

  mainHeading: String,
  subHeading: String,

  week1Icon: String,
  week1Title: String,
  week1Description: String,

  week2Icon: String,
  week2Title: String,
  week2Description: String,

  week3Icon: String,
  week3Title: String,
  week3Description: String,

  week4Icon: String,
  week4Title: String,
  week4Description: String,

  whyHeading: String,

  card1Icon: String,
  card1Title: String,
  card1Description: String,

  card2Icon: String,
  card2Title: String,
  card2Description: String,

  card3Icon: String,
  card3Title: String,
  card3Description: String,

  card4Icon: String,
  card4Title: String,
  card4Description: String

}, { timestamps: true });

module.exports = mongoose.model("Hours24", Hours24Schema);