const express = require("express");
const router = express.Router();
const ourSchoolController = require("../controllers/ourSchoolController");

router.get("/", ourSchoolController.get);
router.put("/", ourSchoolController.upsert);
router.post("/", ourSchoolController.upsert);

module.exports = router;
