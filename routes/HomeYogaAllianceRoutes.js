const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createYogaAlliance,
  getYogaAlliance,
  updateYogaAlliance,
  deleteYogaAlliance
} = require("../controllers/homepage/HomeYogaAllianceController");


// Multer Image Upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// API Routes

router.post("/", upload.array("images", 10), createYogaAlliance);

router.get("/", getYogaAlliance);

router.put("/:id", upload.array("images", 10), updateYogaAlliance);

router.delete("/:id", deleteYogaAlliance);


module.exports = router;