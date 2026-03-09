const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    pages: { type: Number },
    language: { type: String },
    coverImage: { type: String },
    pdfFile: { type: String },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
