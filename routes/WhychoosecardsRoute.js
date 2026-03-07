const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createCard,
  getAllCards,
  getSingleCard,
  updateCard,
  deleteCard
} = require("../controllers/homepage/Whychoosecards");


// MULTER STORAGE
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

router.post("/", upload.single("image"), createCard);

router.get("/", getAllCards);

router.get("/:id", getSingleCard);

router.put("/:id", upload.single("image"), updateCard);

router.delete("/:id", deleteCard);


module.exports = router;