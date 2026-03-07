const TeacherName = require("../../models/homepage/TeacherModel");
const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

exports.upload = multer({ storage: storage });

// CREATE
exports.createTeacher = async (req, res) => {
  try {
    const { teacherName, specialty, subPara, experience } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const newTeacher = await TeacherName.create({
      teacherName,
      specialty,
      subPara,
      experience,
      img: req.file.filename
    });

    res.status(201).json({
      success: true,
      data: newTeacher
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL
exports.getTeachers = async (req, res) => {
  const teachers = await TeacherName.find().sort({ createdAt: -1 });
  res.json({
    success: true,
    data: teachers
  });
};

// UPDATE
exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await TeacherName.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Not found" });
    }

    let updatedData = {
      teacherName: req.body.teacherName,
      specialty: req.body.specialty,
      subPara: req.body.subPara,
      experience: req.body.experience
    };

    if (req.file) {
      updatedData.img = req.file.filename;
    }

    const updated = await TeacherName.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json({
      success: true,
      data: updated
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE
exports.deleteTeacher = async (req, res) => {
  await TeacherName.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Deleted successfully" });
};