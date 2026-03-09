const mongoose = require("mongoose");

const CurriculumItemSchema = new mongoose.Schema(
  {
    title: { type: String },
    items: [{ type: String }],
  },
  { _id: false }
);

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortTitle: { type: String },
    category: { type: String },
    homeSections: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    homeOrder: { type: Number, default: 0 },
    legacyPath: { type: String },

    banner: { type: String },
    description: { type: String },
    duration: { type: String },
    level: { type: String },
    location: { type: String },
    included: { type: String },
    curriculum: { type: [CurriculumItemSchema], default: [] },

    card: {
      title: { type: String },
      price: { type: String },
      image: { type: String },
      formLink: { type: String },
      link: { type: String },
    },

    teacherTraining: {
      images: [{ type: String }],
      duration: { type: String },
      privateRoom: { type: String },
      sharedRoom: { type: String },
      certification: { type: String },
      style: { type: String },
      path: { type: String },
    },

    kundalini: {
      label: { type: String },
      badge: { type: String },
      date: { type: String },
      detailsRoute: { type: String },
    },

    retreat: {
      privatePrice: { type: String },
      sharedPrice: { type: String },
      image: { type: String },
      path: { type: String },
    },

    ayurveda: {
      label: { type: String },
      badge: { type: String },
      date: { type: String },
      detailsRoute: { type: String },
    },

    home: { type: mongoose.Schema.Types.Mixed },
    content: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
