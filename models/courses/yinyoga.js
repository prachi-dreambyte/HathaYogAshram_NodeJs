const mongoose = require("mongoose");

const statSchema = new mongoose.Schema(
  {
    num: { type: String, default: "" },
    label: { type: String, default: "" },
  },
  { _id: false }
);

const moduleSchema = new mongoose.Schema(
  {
    img: { type: String, default: "" },
    title: { type: String, default: "" },
    desc: { type: String, default: "" },
    tags: [{ type: String }],
  },
  { _id: false }
);

const philosophySchema = new mongoose.Schema(
  {
    img: { type: String, default: "" },
    title: { type: String, default: "" },
    text: { type: String, default: "" },
  },
  { _id: false }
);

const anatomyPointSchema = new mongoose.Schema(
  {
    strong: { type: String, default: "" },
    text: { type: String, default: "" },
  },
  { _id: false }
);

const whoCanJoinSchema = new mongoose.Schema(
  {
    img: { type: String, default: "" },
    label: { type: String, default: "" },
  },
  { _id: false }
);

const ctaSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    buttonText: { type: String, default: "" },
    buttonLink: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  { _id: false }
);

const yinYogaSchema = new mongoose.Schema(
  {
    heroEyebrow: { type: String, default: "" },
    heroTitle: { type: String, default: "" },
    heroSubtitle: { type: String, default: "" },
    heroImage: { type: String, default: "" },
    heroBadges: [{ type: String }],

    stats: [statSchema],
    modules: [moduleSchema],
    poses: [{ type: String }],
    philosophy: [philosophySchema],
    anatomyPoints: [anatomyPointSchema],
    whoCanJoin: [whoCanJoinSchema],
    cta: { type: ctaSchema, default: () => ({}) },

    aboutSectionLabel: { type: String, default: "" },
    aboutSectionTitle: { type: String, default: "" },
    aboutSectionDescription: { type: String, default: "" },

    philosophySectionLabel: { type: String, default: "" },
    philosophySectionTitle: { type: String, default: "" },
    philosophySectionDescription: { type: String, default: "" },

    anatomySectionLabel: { type: String, default: "" },
    anatomySectionTitle: { type: String, default: "" },
    anatomyIntro: { type: String, default: "" },

    whoSectionLabel: { type: String, default: "" },
    whoSectionTitle: { type: String, default: "" },
    whoSectionDescription: { type: String, default: "" },

    ctaSectionLabel: { type: String, default: "" },
    ctaSectionTitle: { type: String, default: "" },
    ctaDescription: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("YinYoga", yinYogaSchema);
