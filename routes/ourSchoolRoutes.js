const express = require("express");
const router = express.Router();
const ourSchoolController = require("../controllers/ourSchoolController");

router.get("/", ourSchoolController.get);
router.put("/", ourSchoolController.upsert);
router.post("/", ourSchoolController.upsert);
router.delete("/:id", ourSchoolController.delete); // Add this line
router.get("/:id", ourSchoolController.getById); // Optional: get single item

module.exports = router;