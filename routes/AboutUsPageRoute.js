const express = require("express");
const multer = require("multer");
const controller = require("../controllers/AboutUs/AboutUsPageController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const uploadFields = [
  { name: "heroImage", maxCount: 1 },
  { name: "aboutImage", maxCount: 1 },
];

router.get("/", controller.getAboutUsPage);
router.post("/", upload.fields(uploadFields), controller.createAboutUsPage);
router.post("/create", upload.fields(uploadFields), controller.createAboutUsPage);
router.put("/:id", upload.fields(uploadFields), controller.updateAboutUsPage);

module.exports = router;
