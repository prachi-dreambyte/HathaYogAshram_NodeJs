const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/courses/courseController");

router.get("/", ctrl.getAll);
router.get("/slug/:slug", ctrl.getBySlug);
router.get("/:id/batches", ctrl.getBatchesForCourse);
router.get("/:id", ctrl.getById);
router.post("/", ctrl.uploadBanner, ctrl.create);
router.put("/:id", ctrl.uploadBanner, ctrl.update);
router.delete("/:id", ctrl.remove);
router.get("/:id/related", ctrl.getRelated);

module.exports = router;
