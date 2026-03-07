const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    mainHeading: { type: String, required: true },
    subHeading: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Faq", faqSchema);