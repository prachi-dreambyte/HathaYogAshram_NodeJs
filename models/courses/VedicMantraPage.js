const mongoose = require("mongoose");

const mantraTypeSchema = new mongoose.Schema({
  name: String,
  sanskrit: String,
  transliteration: String,
});

const benefitSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const whyBenefitSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const vedicMantraSchema = new mongoose.Schema({
  heroTitleLine1: String,
  heroTitleLine2: String,
  heroImage: String,

  mantraTitle: String,
  mantraDescription: String,
  mantraDescription2: String,
  mantraHighlight: String,
  mantraImage: String,

  whyTitle: String,
  whyDescription: String,
  whyBenefitItems: [whyBenefitSchema],
  omSanskritText: String,
  whyImage: String,

  typesTitle: String,
  typesParagraph1: String,
  typesParagraph2: String,
  typesParagraph3: String,
  typesParagraph4: String,
  mantraTypes: [mantraTypeSchema],

  gayatriVideoUrl: String,
  gayatriTitle: String,
  gayatriLines: [String],
  gayatriDesc: String,
  gayatriSanskrit: String,
  gayatriTranslation: String,
  mantraCategories: [String],
  bookButtonText: String,

  benefitsTitle: String,
  benefitsIntro: String,
  benefits: [benefitSchema],
  benefitsImage: String,
  contactButtonText: String,

  courseTitle: String,
  courseIntro: String,
  certificationTitle: String,
  donationPrice: String,
  courseDuration: String,
  courseEligibility: String,
  courseWhatYouGet: String,
  teacherImage: String,

  rulesTitle: String,
  prerequisitesSubtitle: String,
  prerequisitesContent: String,
  rulesSubtitle: String,
  rulesContent: String,
  refundSubtitle: String,
  refundContent: String,
});

module.exports = mongoose.model("VedicMantra", vedicMantraSchema);