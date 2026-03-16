const mongoose = require("mongoose");

const AyurvedaSchema = new mongoose.Schema({
  heroTitle: String,
  heroSubtitle: String,
  heroImage: String,

  whatIsAyurvedaHeading: String,
  whatIsAyurvedaParagraph: String,
  whatIsAyurvedaImage: String,

  vataIcon: String,
  vataHeading: String,
  vataDescription: String,
  vataTips: String,

  pittaIcon: String,
  pittaHeading: String,
  pittaDescription: String,
  pittaTips: String,

  kaphaIcon: String,
  kaphaHeading: String,
  kaphaDescription: String,
  kaphaTips: String,

  teacherTrainingHeading: String,
  teacherTrainingDesc: String,
  teacherTrainingImage: String,

  seasonal: String,
  ritucharyaWinter: String,
  ritucharyaWinterParagraph: String,
  ritucharyaSummer: String,
  ritucharyaSummerParagraph: String,
  ritucharyaMonsoon: String,
  ritucharyaMonsoonParagraph: String,

  Food: String,
  FoodImage: String,
  foodPara: String,
  foodPrinciplesHeading: String,
  foodPrinciplesPara: String,

  benefitsList: String,
  benefitsPara: String,
  benefitsImage: String,

  Connection: String,
  ConnectionPara: String,

  connectionItems: Array,
  benefitsItems: Array,
  dinacharyaItems: Array,
  therapyItems: Array

}, { timestamps: true });

module.exports = mongoose.model("Ayurveda", AyurvedaSchema);