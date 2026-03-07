const express = require("express");
const router = express.Router();
const section1Ctrl = require("../controllers/homepage/Section1controllers");

router.post("/", section1Ctrl.upload, section1Ctrl.createSection1);
router.get("/", section1Ctrl.getSection1);
router.put("/:id", section1Ctrl.upload, section1Ctrl.updateSection1);
router.delete("/:id", section1Ctrl.deleteSection1);

module.exports = router;