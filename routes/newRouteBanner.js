const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createBanner,
  getBanners,
  deleteBanner
} = require("../controllers/homepage/homebanneControllers");

/* ================= MULTER CONFIG ================= */

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s/g, "-");

    cb(null, uniqueName);
  }

});

const upload = multer({ storage });

/* ================= ROUTES ================= */

router.post("/", upload.single("image"), createBanner);

router.get("/", getBanners);

router.delete("/:id", deleteBanner);

module.exports = router;