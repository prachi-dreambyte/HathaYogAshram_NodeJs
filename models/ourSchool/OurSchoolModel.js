const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    image: { type: String, default: "" },
    imageAlt: { type: String, default: "" },
    contentHtml: { type: String, default: "" },
  },
  { _id: false }
);

const SchoolSchema = new mongoose.Schema(
  {
    id: { type: String, default: "" },
    name: { type: String, default: "" },
    iconKey: { type: String, default: "School" },
    sections: {
      about: { type: SectionSchema, default: () => ({}) },
      vision: { type: SectionSchema, default: () => ({}) },
      teaching: { type: SectionSchema, default: () => ({}) },
      values: { type: SectionSchema, default: () => ({}) },
      edge: { type: SectionSchema, default: () => ({}) },
    },
  },
  { _id: false }
);

const NavSectionSchema = new mongoose.Schema(
  {
    id: { type: String, default: "" },
    label: { type: String, default: "" },
    iconKey: { type: String, default: "School" },
  },
  { _id: false }
);

const OurSchoolSchema = new mongoose.Schema(
  {
    hero: {
      title: { type: String, default: "" },
      subtitle: { type: String, default: "" },
      omText: { type: String, default: "ॐ" },
    },
    sectionNav: { type: [NavSectionSchema], default: [] },
    schools: { type: [SchoolSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OurSchool", OurSchoolSchema);
