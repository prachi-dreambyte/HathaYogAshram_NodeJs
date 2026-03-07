const express = require("express");
const router = express.Router();

const {
  createHeading,
  getHeadings,
  updateHeading,
  deleteHeading,
} = require("../controllers/homepage/TestinomialHeadingController");

router.post("/", createHeading);
router.get("/", getHeadings);
router.put("/:id", updateHeading);
router.delete("/:id", deleteHeading);

module.exports = router;