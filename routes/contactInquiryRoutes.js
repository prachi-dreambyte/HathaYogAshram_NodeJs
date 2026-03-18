const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/contactInquiryController");
const { requireAuth, requireAdmin } = require("../middleware/auth");

router.post("/", ctrl.create);
router.get("/", requireAuth, requireAdmin, ctrl.list);

module.exports = router;

