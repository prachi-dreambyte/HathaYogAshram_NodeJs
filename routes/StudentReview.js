const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/homepage/StudentReview");


// Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });


// ROUTES
router.get("/", getReviews);

router.post("/", upload.single("img"), createReview);

router.put("/:id", upload.single("img"), updateReview);

router.delete("/:id", deleteReview);

module.exports = router;