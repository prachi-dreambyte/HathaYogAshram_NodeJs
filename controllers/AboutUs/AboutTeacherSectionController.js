const AboutTeacherDetails = require("../../models/AboutUs/AboutTeacherSectionModel");
const multer = require("multer");
const path   = require("path");
const fs     = require("fs");

// ── Multer Storage ────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../uploads");
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

exports.upload = multer({ storage });

// ── Helpers ───────────────────────────────────────────────────────────────────
const buildImageUrl = (req, filename) =>
  `${req.protocol}://${req.get("host")}/uploads/${filename}`;

// ── CREATE ────────────────────────────────────────────────────────────────────
exports.createTeacher = async (req, res) => {
  try {
    const { name, role, bio, education, experience, expertise } = req.body;

    const teacher = new AboutTeacherDetails({
      name,
      role:       JSON.parse(role),
      bio:        JSON.parse(bio),
      education:  JSON.parse(education),
      experience: JSON.parse(experience),
      expertise:  JSON.parse(expertise),
      image:      req.file ? buildImageUrl(req, req.file.filename) : "",
    });

    await teacher.save();
    res.status(201).json({ success: true, data: teacher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── GET ALL ───────────────────────────────────────────────────────────────────
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await AboutTeacherDetails.find().sort({ createdAt: -1 });
    res.json({ success: true, data: teachers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── GET SINGLE ────────────────────────────────────────────────────────────────
exports.getTeacher = async (req, res) => {
  try {
    const teacher = await AboutTeacherDetails.findById(req.params.id);
    if (!teacher)
      return res.status(404).json({ success: false, message: "Teacher not found" });
    res.json({ success: true, data: teacher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── UPDATE ────────────────────────────────────────────────────────────────────
exports.updateTeacher = async (req, res) => {
  try {
    const updateData = {
      name:       req.body.name,
      role:       JSON.parse(req.body.role),
      bio:        JSON.parse(req.body.bio),
      education:  JSON.parse(req.body.education),
      experience: JSON.parse(req.body.experience),
      expertise:  JSON.parse(req.body.expertise),
    };

    // Only overwrite image when a new file is actually uploaded
    if (req.file) {
      updateData.image = buildImageUrl(req, req.file.filename);
    }

    const teacher = await AboutTeacherDetails.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!teacher)
      return res.status(404).json({ success: false, message: "Teacher not found" });

    res.json({ success: true, data: teacher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── DELETE ────────────────────────────────────────────────────────────────────
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await AboutTeacherDetails.findByIdAndDelete(req.params.id);
    if (!teacher)
      return res.status(404).json({ success: false, message: "Teacher not found" });
    res.json({ success: true, message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};