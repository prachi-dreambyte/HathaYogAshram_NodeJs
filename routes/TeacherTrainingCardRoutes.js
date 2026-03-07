const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  createCard,
  getCards,
  updateCard,
  deleteCard
} = require("../controllers/homepage/TrainingCardsController");


router.post("/", upload.single("image"), createCard);

router.get("/", getCards);

router.put("/:id", upload.single("image"), updateCard);

router.delete("/:id", deleteCard);

module.exports = router;