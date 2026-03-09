const mongoose = require("mongoose");

const BlogPageSchema = new mongoose.Schema(
  {
    topLabel: { type: String, default: "" },
    title: { type: String, default: "" },
    breadcrumbLabel: { type: String, default: "" },
    sectionTitle: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlogPage", BlogPageSchema);
