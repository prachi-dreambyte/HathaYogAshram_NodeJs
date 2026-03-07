const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const controller = require("../controllers/homepage/HomeGivingBack");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.get("/", controller.getAll);
router.post("/", upload.array("images"), controller.create);
router.put("/:id", upload.array("images"), controller.update);
router.delete("/:id", controller.delete);

module.exports = router;