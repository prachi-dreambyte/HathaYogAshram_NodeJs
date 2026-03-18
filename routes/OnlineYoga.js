const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createOnlineYoga,
  getOnlineYoga,
  updateOnlineYoga,
  deleteOnlineYoga
} = require("../controllers/courses/OnlineYoga");

router
  .route("/")
  .get(getOnlineYoga)
  .post(upload.any(), createOnlineYoga);

router
  .route("/:id")
  .put(upload.any(), updateOnlineYoga)
  .delete(deleteOnlineYoga);

module.exports = router;
