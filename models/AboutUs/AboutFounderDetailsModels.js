const mongoose = require("mongoose");

const PhilosophyItemSchema = new mongoose.Schema({
  icon:      { type: String }, // full URL
  heading:   { type: String },
  paragraph: { type: String },
}, { _id: false });

const AboutFounderDetailsSchema = new mongoose.Schema(
  {
    // Founder Details
    founderName: { type: String, required: true },
    role:        { type: String, required: true },
    img:         { type: String },
    shortTitle:  { type: String },
    stats:       { type: String },

    // Quotes
    mainQuote:  { type: String },
    quoteTitle: { type: String },

    // Biography
    mainBiography: { type: String },
    bioTitle:      { type: String },

    // Philosophy
    mainPhilosophy:  { type: String },
    philosophyItems: { type: [PhilosophyItemSchema], default: [] }, // 4 items

    // Philosophy bottom
    heading:     { type: String },
    description: { type: String },

    // Achievements
    mainAchievements: { type: String },
    text:             { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AboutFounderDetails", AboutFounderDetailsSchema);