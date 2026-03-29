const mongoose = require("mongoose");

const IconTextItemSchema = new mongoose.Schema(
  {
    icon: { type: String, default: "" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const StatSchema = new mongoose.Schema(
  {
    icon: { type: String, default: "" },
    value: { type: String, default: "" },
    label: { type: String, default: "" },
  },
  { _id: false }
);

const TimelineItemSchema = new mongoose.Schema(
  {
    year: { type: Number, default: null },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const NumberedItemSchema = new mongoose.Schema(
  {
    number: { type: String, default: "" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const AboutUsPageSchema = new mongoose.Schema(
  {
    hero: {
      quoteText: { type: String, default: "" },
      title: { type: String, default: "" },
      heroImage: { type: String, default: "" },
    },
    stats: { type: [StatSchema], default: [] },
    floatingCards: { type: [IconTextItemSchema], default: [] },
    overview: {
      sectionLabel: { type: String, default: "" },
      sectionTitle: { type: String, default: "" },
      leadText: { type: String, default: "" },
      paragraphs: { type: [String], default: [] },
      aboutImage: { type: String, default: "" },
      mantraSymbol: { type: String, default: "ॐ" },
      mantraText: { type: String, default: "" },
      highlights: { type: [IconTextItemSchema], default: [] },
    },
    missionVision: {
      missionTitle: { type: String, default: "" },
      missionDescription: { type: String, default: "" },
      missionPoints: { type: [String], default: [] },
      visionTitle: { type: String, default: "" },
      visionDescription: { type: String, default: "" },
      visionPoints: { type: [String], default: [] },
    },
    values: {
      sectionLabel: { type: String, default: "" },
      sectionTitle: { type: String, default: "" },
      sectionDesc: { type: String, default: "" },
      items: { type: [IconTextItemSchema], default: [] },
    },
    timeline: {
      sectionLabel: { type: String, default: "" },
      sectionTitle: { type: String, default: "" },
      sectionDesc: { type: String, default: "" },
      items: { type: [TimelineItemSchema], default: [] },
    },
    whyChoose: {
      sectionLabel: { type: String, default: "" },
      sectionTitle: { type: String, default: "" },
      items: { type: [NumberedItemSchema], default: [] },
    },
    goals: {
      sectionLabel: { type: String, default: "" },
      sectionTitle: { type: String, default: "" },
      items: { type: [IconTextItemSchema], default: [] },
    },
    facilities: {
      sectionLabel: { type: String, default: "" },
      sectionTitle: { type: String, default: "" },
      items: { type: [IconTextItemSchema], default: [] },
    },
    studentReviews: {
      sectionLabel: { type: String, default: "" },
      sectionTitle: { type: String, default: "" },
      sectionDesc: { type: String, default: "" },
    },
    cta: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      primaryButtonText: { type: String, default: "" },
      secondaryButtonText: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AboutUsPage", AboutUsPageSchema);
