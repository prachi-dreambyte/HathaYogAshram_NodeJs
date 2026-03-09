const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getAccommodation,
  createAccommodation,
  updateAccommodation,
  deleteAccommodation
} = require("../controllers/AboutUs/Accommodation");


const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }

});

const upload = multer({ storage: storage });


const multiUpload = upload.fields([
  { name: "building1Images", maxCount: 10 },
  { name: "building2Images", maxCount: 10 },
  { name: "foodImages", maxCount: 10 }
]);


router.get("/", getAccommodation);

router.post("/", multiUpload, createAccommodation);

router.put("/:id", multiUpload, updateAccommodation);

router.delete("/:id", deleteAccommodation);


module.exports = router;