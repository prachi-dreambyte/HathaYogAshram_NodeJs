const mongoose = require("mongoose");

const CurriculumItemSchema = new mongoose.Schema(
  { title: { type: String }, items: [{ type: String }] },
  { _id: false }
);

const AccommodationRoomSchema = new mongoose.Schema(
  { type: { type: String }, description: { type: String } },
  { _id: false }
);
const AccommodationFeatureSchema = new mongoose.Schema(
  { label: { type: String }, detail: { type: String } },
  { _id: false }
);
const AccommodationSchema = new mongoose.Schema(
  {
    tag: { type: String },
    title: { type: String },
    image: { type: String },
    rooms: { type: [AccommodationRoomSchema], default: [] },
    features: { type: [AccommodationFeatureSchema], default: [] },
  },
  { _id: false }
);

const FoodMealSchema = new mongoose.Schema(
  { meal: { type: String }, description: { type: String } },
  { _id: false }
);
const FoodSchema = new mongoose.Schema(
  {
    tag: { type: String },
    title: { type: String },
    image: { type: String },
    meals: { type: [FoodMealSchema], default: [] },
  },
  { _id: false }
);

const WhyChooseSchema = new mongoose.Schema(
  {
    tag: { type: String },
    title: { type: String },
    image: { type: String },
    idealForTitle: { type: String },
    idealFor: { type: [String], default: [] },
    benefitsTitle: { type: String },
    benefits: { type: [String], default: [] },
  },
  { _id: false }
);

// ── Our Courses Section ───────────────────────────────────────────────────────
// Stores only the heading/tag/description.
// The actual course cards are fetched at runtime from the same category,
// excluding the current course (handled in the controller / frontend).
const OurCoursesSectionSchema = new mongoose.Schema(
  {
    tag: { type: String, default: "Explore More" },
    title: { type: String, default: "Our Related Courses" },
    description: { type: String, default: "" },
  },
  { _id: false }
);

// ── Main Schema ───────────────────────────────────────────────────────────────
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
      title: { type: String },
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
    accommodation: { type: AccommodationSchema, default: () => ({}) },
    food: { type: FoodSchema, default: () => ({}) },
    whyChoose: { type: WhyChooseSchema, default: () => ({}) },
    ourCoursesSection: { type: OurCoursesSectionSchema, default: () => ({}) },

    content: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
