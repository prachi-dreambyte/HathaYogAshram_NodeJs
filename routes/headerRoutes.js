// headerRoutes.js
const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/Header/Headercontroller");

// GET  /api/header        — fetch current header settings
router.get("/", ctrl.get);

// PUT  /api/header        — create or update header settings (upsert)
router.put("/", ctrl.uploadLogo, ctrl.upsert);

module.exports = router;