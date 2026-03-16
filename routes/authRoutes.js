const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/authController");

router.post("/login", ctrl.login);
router.post("/verify", ctrl.verify);

module.exports = router;
