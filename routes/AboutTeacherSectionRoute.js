const express = require("express");
const router = express.Router();

const multer = require("multer");

const {
createTeacher,
getTeachers,
getTeacher,
updateTeacher,
deleteTeacher
} = require("../controllers/aboutTeacherDetailsController");


// multer config
const storage = multer.diskStorage({

destination: function (req, file, cb) {
cb(null, "uploads/");
},

filename: function (req, file, cb) {
cb(null, Date.now() + "-" + file.originalname);
}

});

const upload = multer({ storage });


// routes
router.post("/", upload.single("image"), createTeacher);

router.get("/", getTeachers);

router.get("/:id", getTeacher);

router.put("/:id", upload.single("image"), updateTeacher);

router.delete("/:id", deleteTeacher);


module.exports = router;