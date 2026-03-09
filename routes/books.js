const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ctrl = require("../controllers/Books/BooksController");

const BOOKS_DIR = path.join("uploads", "books");

// ── Multer config ─────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(BOOKS_DIR, { recursive: true });
    cb(null, BOOKS_DIR);
  },
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp|svg|pdf/;
  const ext = path.extname(file.originalname).toLowerCase();
  allowed.test(ext) ? cb(null, true) : cb(new Error("Images/PDF only!"), false);
};

const upload = multer({ storage, fileFilter });

const uploadFields = upload.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "pdfFile", maxCount: 1 },
]);

// ── Routes ────────────────────────────────────────────────────────────────────
router.get("/", ctrl.getBooks);
router.get("/:id", ctrl.getBookById);
router.post("/", uploadFields, ctrl.createBook);
router.put("/:id", uploadFields, ctrl.updateBook);
router.delete("/:id", ctrl.deleteBook);

module.exports = router;
