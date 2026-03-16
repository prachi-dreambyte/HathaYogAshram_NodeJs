const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createAyurveda,
  getAyurveda,
  updateAyurveda,
  deleteAyurveda
} = require("../controllers/courses/ayurveda");


// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

const uploadFields = upload.fields([
  { name: "heroImage" },
  { name: "whatIsAyurvedaImage" },
  { name: "teacherTrainingImage" },
  { name: "FoodImage" },
  { name: "benefitsImage" }
]);


router.post("/", uploadFields, createAyurveda);
router.get("/", getAyurveda);
router.put("/:id", uploadFields, updateAyurveda);
router.delete("/:id", deleteAyurveda);

module.exports = router;