const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getGallery,
  createGallery,
  updateGallery,
  deleteGallery
} = require("../controllers/AboutUs/Gallery");


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


router.get("/", getGallery);

router.post("/", upload.array("img"), createGallery);

router.put("/:id", upload.array("img"), updateGallery);

router.delete("/:id", deleteGallery);

module.exports = router;