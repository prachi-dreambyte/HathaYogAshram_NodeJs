const express = require("express");
const router = express.Router();

const controller =
require("../controllers/homepage/HomeTeacherTrainingController");

router.post(
  "/",
  controller.upload.single("video"), // IMPORTANT
  controller.createTeacherTraining
);

router.get("/", controller.getTeacherTraining);

router.put(
  "/:id",
  controller.upload.single("video"),
  controller.updateTeacherTraining
);

router.delete(
  "/:id",
  controller.deleteTeacherTraining
);

module.exports = router;