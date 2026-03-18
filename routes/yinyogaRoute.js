const express = require("express");
const router = express.Router();

const {
  uploadYinYogaAssets,
  createYinYoga,
  getYinYoga,
  updateYinYoga,
  deleteYinYoga,
} = require("../controllers/courses/yinyoga");

router.get("/", getYinYoga);
router.post("/", uploadYinYogaAssets, createYinYoga);
router.put("/:id", uploadYinYogaAssets, updateYinYoga);
router.delete("/:id", deleteYinYoga);

module.exports = router;
