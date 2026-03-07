const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  createCard,
  getCards,
  updateCard,
  deleteCard
} = require("../controllers/homepage/FacilityCards");


// Multer Storage
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }

});

const upload = multer({ storage });


// Routes
router.post("/", upload.single("image"), createCard);

router.get("/", getCards);

router.put("/:id", upload.single("image"), updateCard);

router.delete("/:id", deleteCard);


module.exports = router;