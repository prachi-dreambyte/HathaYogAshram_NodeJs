const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/Footer/FooterController");

router.get("/", ctrl.get);
router.put("/", ctrl.uploadLogos, ctrl.upsert);

module.exports = router;
