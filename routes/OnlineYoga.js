const express = require("express");
const router = express.Router();

const {
  createOnlineYoga,
  getOnlineYoga,
  deleteOnlineYoga
} = require("../controllers/courses/OnlineYoga");
router.post("/", createOnlineYoga);

router.get("/", getOnlineYoga);

router.delete("/:id", deleteOnlineYoga);

module.exports = router;