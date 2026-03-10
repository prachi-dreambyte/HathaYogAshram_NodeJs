const express = require("express");
const router = express.Router();
const blogPageController = require("../controllers/blogPageController");

router.get("/", blogPageController.get);
router.put("/", blogPageController.upsert);
router.post("/", blogPageController.upsert);

module.exports = router;
