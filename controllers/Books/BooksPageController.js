const BooksPage = require("../../models/Books/BooksPageModel");

// ── GET ALL ──────────────────────────────────────────────────────────────────
exports.getAll = async (req, res) => {
  try {
    const data = await BooksPage.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── GET ONE ──────────────────────────────────────────────────────────────────
exports.getOne = async (req, res) => {
  try {
    const item = await BooksPage.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── CREATE ───────────────────────────────────────────────────────────────────
exports.create = async (req, res) => {
  try {
    const item = await BooksPage.create({
      heroQuote: req.body.heroQuote || "",
      heroTitle: req.body.heroTitle || "",
      heroBreadcrumb: req.body.heroBreadcrumb || "",
      libraryTitle: req.body.libraryTitle || "",
      librarySubtitle: req.body.librarySubtitle || "",
      libraryDescription: req.body.libraryDescription || "",
    });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ── UPDATE ───────────────────────────────────────────────────────────────────
exports.update = async (req, res) => {
  try {
    const existing = await BooksPage.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    const updated = await BooksPage.findByIdAndUpdate(
      req.params.id,
      {
        heroQuote: req.body.heroQuote ?? existing.heroQuote,
        heroTitle: req.body.heroTitle ?? existing.heroTitle,
        heroBreadcrumb: req.body.heroBreadcrumb ?? existing.heroBreadcrumb,
        libraryTitle: req.body.libraryTitle ?? existing.libraryTitle,
        librarySubtitle: req.body.librarySubtitle ?? existing.librarySubtitle,
        libraryDescription: req.body.libraryDescription ?? existing.libraryDescription,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ── DELETE ───────────────────────────────────────────────────────────────────
exports.remove = async (req, res) => {
  try {
    const item = await BooksPage.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    await item.deleteOne();
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
