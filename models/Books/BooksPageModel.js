const mongoose = require("mongoose");

const BooksPageSchema = new mongoose.Schema(
  {
    heroQuote: { type: String, default: "" },
    heroTitle: { type: String, default: "" },
    heroBreadcrumb: { type: String, default: "" },
    libraryTitle: { type: String, default: "" },
    librarySubtitle: { type: String, default: "" },
    libraryDescription: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BooksPage", BooksPageSchema);
