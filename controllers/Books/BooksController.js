const Book = require("../../models/Books/BookModel");
const fs = require("fs");
const path = require("path");

const BOOKS_DIR = path.join("uploads", "books");

const safeUnlink = (filePath) => {
  if (!filePath) return;
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
};

// ── CREATE ───────────────────────────────────────────────────────────────────
exports.createBook = async (req, res) => {
  try {
    const coverImage = req.files?.coverImage?.[0]?.filename || "";
    const pdfFile = req.files?.pdfFile?.[0]?.filename || "";

    const book = await Book.create({
      title: req.body.title || "",
      author: req.body.author || "",
      description: req.body.description || "",
      category: req.body.category || "",
      pages: req.body.pages ? Number(req.body.pages) : undefined,
      language: req.body.language || "",
      coverImage,
      pdfFile,
      isPublished: req.body.isPublished !== "false",
    });

    res.status(201).json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ── GET ALL ──────────────────────────────────────────────────────────────────
exports.getBooks = async (req, res) => {
  try {
    const includeUnpublished = req.query.includeUnpublished === "true";
    const limit = Number(req.query.limit);

    const filter = includeUnpublished ? {} : { isPublished: true };
    let query = Book.find(filter).sort({ createdAt: -1 });

    if (Number.isFinite(limit) && limit > 0) {
      query = query.limit(limit);
    }

    const data = await query;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── GET ONE ──────────────────────────────────────────────────────────────────
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found." });
    }
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── UPDATE ───────────────────────────────────────────────────────────────────
exports.updateBook = async (req, res) => {
  try {
    const existing = await Book.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Book not found." });
    }

    const newCover = req.files?.coverImage?.[0]?.filename || "";
    const newPdf = req.files?.pdfFile?.[0]?.filename || "";

    if (newCover && existing.coverImage) {
      safeUnlink(path.join(BOOKS_DIR, existing.coverImage));
    }
    if (newPdf && existing.pdfFile) {
      safeUnlink(path.join(BOOKS_DIR, existing.pdfFile));
    }

    const updated = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title ?? existing.title,
        author: req.body.author ?? existing.author,
        description: req.body.description ?? existing.description,
        category: req.body.category ?? existing.category,
        pages: req.body.pages ? Number(req.body.pages) : existing.pages,
        language: req.body.language ?? existing.language,
        coverImage: newCover || existing.coverImage,
        pdfFile: newPdf || existing.pdfFile,
        isPublished:
          req.body.isPublished !== undefined
            ? req.body.isPublished !== "false"
            : existing.isPublished,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ── DELETE ───────────────────────────────────────────────────────────────────
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found." });
    }

    if (book.coverImage) {
      safeUnlink(path.join(BOOKS_DIR, book.coverImage));
    }
    if (book.pdfFile) {
      safeUnlink(path.join(BOOKS_DIR, book.pdfFile));
    }

    await book.deleteOne();

    res.status(200).json({ success: true, message: "Book deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
