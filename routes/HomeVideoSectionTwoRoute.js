const express = require("express");

const router = express.Router();
const controller = require("../controllers/homepage/HomeVideoSectionTwoController");

router.get("/", controller.get);
router.put("/", controller.upsert);

module.exports = router;
