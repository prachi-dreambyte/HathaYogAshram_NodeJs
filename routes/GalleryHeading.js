const express = require("express");
const router = express.Router();

const {
  getGallery,
  createGallery,
  updateGallery,
  deleteGallery
} = require("../controllers/AboutUs/GalleryHeading");


router.get("/", getGallery);

router.post("/", createGallery);

router.put("/:id", updateGallery);

router.delete("/:id", deleteGallery);

module.exports = router;