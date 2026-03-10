const express = require("express");

const router = express.Router();

const {

  getHours24,
  createHours24,
  updateHours24,
  deleteHours24

} = require("../controllers/AboutUs/Hours24Controller");


router.get("/", getHours24);

router.post("/", createHours24);

router.put("/:id", updateHours24);

router.delete("/:id", deleteHours24);


module.exports = router;