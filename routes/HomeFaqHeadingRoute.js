const express = require("express");
const router = express.Router();
const {
  uploadImage,
  getAll,
  getById,
  create,
  update,
  remove,
  removeImage,
} = require("../controllers/homepage/FaqHeading");

router.get("/",             getAll);
router.get("/:id",          getById);
router.post("/",            uploadImage, create);
router.put("/:id",          uploadImage, update);
router.delete("/:id",       remove);
router.delete("/:id/image", removeImage);

module.exports = router;