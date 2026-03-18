const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/contactUsController");
const { requireAuth, requireAdmin } = require("../middleware/auth");

router.get("/", ctrl.get);
router.put("/", requireAuth, requireAdmin, ctrl.upsert);

module.exports = router;

