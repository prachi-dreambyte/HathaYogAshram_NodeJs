const mongoose = require('mongoose');

const blogDetailsSchema = new mongoose.Schema({
  // Hero Section
  category: String,
  heroTitle: String,
  slug: { type: String, unique: true },
  heroSubtitle: String,
  breadcrumb: String,
  heroImage: String,      // filename
  BlogMainImage: String,  // filename

  // Intro
  introQuote: String,
  introText: String,

  // What Is
  whatHeading: String,
  whatParagraph: String,
  whatTitle: String,
  whatDescription: String,

  // Steps
  stepHeading: String,
  stepparagraph: String,
  step1Title: String,
  step1Desc: String,
  stepTip1Heading: String,
  step1Tip1Paragraph: String,
  step2Title: String,
  step2Desc: String,
  stepTip2Heading: String,
  stepTip2Paragraph: String,
  step3Title: String,
  step3Desc: String,
  stepTip3Heading: String,
  step1Tip3Paragraph: String,
  step4Title: String,
  step4Desc: String,
  stepTip4Heading: String,
  step1Tip4Paragraph: String,
  step5Title: String,
  step5Desc: String,
  stepTip5Heading: String,
  step1Tip5Paragraph: String,

  // Benefits
  benefitHeading: String,
  benefitparagraph: String,
  benefit1Title: String,
  benefit1Desc: String,
  benefit1Icon: String,
  benefit2Title: String,
  benefit2Desc: String,
  benefit2Icon: String,
  benefit3Title: String,
  benefit3Desc: String,
  benefit3Icon: String,
  benefit4Title: String,
  benefit4Desc: String,
  benefit4Icon: String,
  benefit5Title: String,
  benefit5Desc: String,
  benefit5Icon: String,

  // Why Practice
  whyTitle: String,
  whyDescription: String,

  // Who Should Practice
  whoTitle: String,
  who1Title: String,
  who1Des: String,
  who2Title: String,
  who2Des: String,
  who3Title: String,
  who3Des: String,
  who4Title: String,
  who4Des: String,

  // Daily Yoga
  dailyMainTitle: String,
  daily1Title: String,
  daily1Desc: String,
  daily2Title: String,
  daily2Desc: String,
  daily3Title: String,
  daily3Desc: String,
  daily4Title: String,
  daily4Desc: String,

  // Precautions
  precautionsTitle: String,
  precautionsText: String,

  // Why Choose
  chooseMainTitle: String,
  chooseTitle: String,
  choose1: String,
  choose2: String,
  choose3: String,
  choose4: String,
  choose5: String,
  choose6: String,

  // Conclusion
  conclusionMainTitle: String,
  conclusion: String,

  // FAQ
  faq1Q: String,
  faq1A: String,
  faq2Q: String,
  faq2A: String,
  faq3Q: String,
  faq3A: String,
  faq4Q: String,
  faq4A: String,
}, { timestamps: true });

module.exports = mongoose.model('BlogDetails', blogDetailsSchema);