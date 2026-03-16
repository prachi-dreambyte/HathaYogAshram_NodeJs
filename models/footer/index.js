const mongoose = require("mongoose");

const FooterLinkSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    path: { type: String, required: true },
  },
  { _id: false }
);

const FooterSectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    links: { type: [FooterLinkSchema], default: [] },
  },
  { _id: false }
);

const ContactItemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["location", "phone", "email", "clock", "custom"],
      default: "custom",
    },
    value: { type: String, required: true },
    href: { type: String, default: "" },
  },
  { _id: false }
);

const SocialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

const FooterSchema = new mongoose.Schema(
  {
    aboutText: {
      type: String,
      default:
        "Hatha Yog Ashram, founded in 2017 in Rishikesh, India, is one of the most trusted yoga teacher training schools. We offer traditional Hatha, Ashtanga, Kundalini, Meditation and Pranayama practices rooted in ancient yogic wisdom.",
    },
    primaryLogoUrl: { type: String, default: "" },
    secondaryLogoUrl: { type: String, default: "" },
    trustText: { type: String, default: "YogAshram Trust." },
    linkSections: { type: [FooterSectionSchema], default: [] },
    contactTitle: { type: String, default: "Contact" },
    contactItems: { type: [ContactItemSchema], default: [] },
    socialLinks: { type: [SocialLinkSchema], default: [] },
    keywords: { type: [String], default: [] },
    copyrightText: {
      type: String,
      default:
        "Hatha Yog Ashram | Coming under Yog Ashram | All Rights Reserved.",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Footer", FooterSchema);
