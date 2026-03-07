const express = require("express");
const router = express.Router();
const {
  upload,
  createTeacher,
  getTeachers,
  updateTeacher,
  deleteTeacher
} = require("../controllers/homepage/teacherController");

router.post("/", upload.single("img"), createTeacher);
router.get("/", getTeachers);
router.put("/:id", upload.single("img"), updateTeacher);
router.delete("/:id", deleteTeacher);

module.exports = router;