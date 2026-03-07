const express = require("express");
const router = express.Router();
const controller = require("../controllers/homepage/HowToReachheading");

// CRUD routes
router.get("/", controller.getAllHeadings);
router.post("/", controller.createHeading);
router.put("/:id", controller.updateHeading);
router.delete("/:id", controller.deleteHeading);

module.exports = router;