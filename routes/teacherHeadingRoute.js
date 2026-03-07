const express = require("express");
const router = express.Router();
const {
  createHeading,
  getAllHeadings,
  getHeadingById,
  updateHeading,
  deleteHeading
} = require("../controllers/homepage/teacherHeadingController");

router.post("/", createHeading);
router.get("/", getAllHeadings);
router.get("/:id", getHeadingById);
router.put("/:id", updateHeading);
router.delete("/:id", deleteHeading);

module.exports = router;