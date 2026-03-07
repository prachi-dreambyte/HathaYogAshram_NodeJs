const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  createTestimonial,
  getTestimonials,
  deleteTestimonial
} = require("../controllers/homepage/HomeTestinomialCardController");

router.post("/", upload.single("image"), createTestimonial);

router.get("/", getTestimonials);

router.delete("/:id", deleteTestimonial);

module.exports = router;