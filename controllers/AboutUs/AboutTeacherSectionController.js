const AboutTeacherDetails = require("../models/AboutTeacherDetails");


// CREATE
exports.createTeacher = async (req, res) => {
  try {

    const {
      name,
      role,
      bio,
      education,
      experience,
      expertise
    } = req.body;

    const teacher = new AboutTeacherDetails({
      name,
      role: JSON.parse(role),
      bio: JSON.parse(bio),
      education: JSON.parse(education),
      experience: JSON.parse(experience),
      expertise: JSON.parse(expertise),
      image: req.file ? `/uploads/${req.file.filename}` : ""
    });

    await teacher.save();

    res.status(201).json({
      success: true,
      data: teacher
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// GET ALL
exports.getTeachers = async (req, res) => {

  try {

    const teachers = await AboutTeacherDetails.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: teachers
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// GET SINGLE
exports.getTeacher = async (req, res) => {

  try {

    const teacher = await AboutTeacherDetails.findById(req.params.id);

    res.json({
      success: true,
      data: teacher
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// UPDATE
exports.updateTeacher = async (req, res) => {

  try {

    const updateData = {
      name: req.body.name,
      role: JSON.parse(req.body.role),
      bio: JSON.parse(req.body.bio),
      education: JSON.parse(req.body.education),
      experience: JSON.parse(req.body.experience),
      expertise: JSON.parse(req.body.expertise)
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const teacher = await AboutTeacherDetails.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      data: teacher
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// DELETE
exports.deleteTeacher = async (req, res) => {

  try {

    await AboutTeacherDetails.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Teacher deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};