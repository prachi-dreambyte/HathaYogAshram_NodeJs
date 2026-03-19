const express = require("express");
const router = express.Router();
const controller = require("../controllers/courses/VedicMantraPage");
const upload = require("../middleware/upload");

router.get("/", controller.getAll);

router.post("/", upload.any(), controller.create);

router.put("/:id", upload.any(), controller.update);

router.delete("/:id", controller.remove);

module.exports = router;