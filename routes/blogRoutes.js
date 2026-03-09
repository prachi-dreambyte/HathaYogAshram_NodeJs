const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.get("/", blogController.getAll);
router.get("/slug/:slug", blogController.getBySlug);
router.get("/:id", blogController.getById);
router.post("/", blogController.uploadCover, blogController.create);
router.put("/:id", blogController.uploadCover, blogController.update);
router.delete("/:id", blogController.remove);

module.exports = router;
