const mongoose = require('mongoose');

const connectionItemSchema = new mongoose.Schema({
  heading: String,
  icon: String,
  paragraph: String
});

const benefitItemSchema = new mongoose.Schema({
  heading: String,
  icon: String,
  listParagraph: String
});

const dinacharyaItemSchema = new mongoose.Schema({
  heading: String,
  paragraph: String,
  icon: String
});

const therapyItemSchema = new mongoose.Schema({
  icon: String,
  heading: String,
  desc: String
});

const ayurvedaContentSchema = new mongoose.Schema({
  // Hero
  heroTitle: { type: String, default: 'Ayurveda' },
  heroSubtitle: { type: String, default: 'The Science of Life & Longevity' },
  heroImage: String,

  // What is Ayurveda?
  whatIsAyurvedaHeading: { type: String, default: 'What is Ayurveda?' },
  whatIsAyurvedaParagraph: String,
  whatIsAyurvedaImage: String,

  // Vata
  vataIcon: String,
  vataHeading: { type: String, default: 'Vata (Air & Space)' },
  vataDescription: String,
  vataTips: String,

  // Pitta
  pittaIcon: String,
  pittaHeading: { type: String, default: 'Pitta (Fire & Water)' },
  pittaDescription: String,
  pittaTips: String,

  // Kapha
  kaphaIcon: String,
  kaphaHeading: { type: String, default: 'Kapha (Earth & Water)' },
  kaphaDescription: String,
  kaphaTips: String,

  // Teacher Training
  teacherTrainingHeading: String,
  teacherTrainingDesc: String,
  teacherTrainingImage: String,

  // Ritucharya (seasonal)
  seasonal: String,
  ritucharyaWinter: String,
  ritucharyaWinterParagraph: String,
  ritucharyaSummer: String,
  ritucharyaSummerParagraph: String,
  ritucharyaMonsoon: String,
  ritucharyaMonsoonParagraph: String,

  // Food
  Food: String,
  FoodImage: String,
  foodPara: String,
  foodPrinciplesHeading: String,
  foodPrinciplesPara: String,

  // Benefits (top-level)
  benefitsList: String,
  benefitsPara: String,
  benefitsImage: String,

  // Connection (top-level)
  Connection: String,
  ConnectionPara: String,

  // Dynamic arrays
  connectionItems: [connectionItemSchema],
  benefitsItems: [benefitItemSchema],
  dinacharyaItems: [dinacharyaItemSchema],
  therapyItems: [therapyItemSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('AyurvedaContent', ayurvedaContentSchema);