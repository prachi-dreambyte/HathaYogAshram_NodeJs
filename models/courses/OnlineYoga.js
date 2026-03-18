const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  title: String,
  time: String,
  price: String,
  image: String
});

const benefitSchema = new mongoose.Schema({
  text: String
});

const onlineYogaSchema = new mongoose.Schema({
  heroEyebrow: String,
  heroTitle: String,
  heroSubtitle: String,
  heroDescription: String,
  heroButtonText: String,
  heroButtonLink: String,
  heroBackgroundImage: String,

  classSectionHeading: String,

  classes: [classSchema],

  benefitsImage: String,
  benefitsHeading: String,

  benefits: [benefitSchema],

  finalCtaTitle: String,
  finalCtaButtonText: String,
  finalCtaButtonLink: String

},
{ timestamps: true });

module.exports = mongoose.model("OnlineYoga", onlineYogaSchema);
