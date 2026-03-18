const TeacherTraining = require("../../models/homepage/HomeTeacherTrainingModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const videosUploadDir = path.resolve(__dirname, "../../uploads/videos");

if (!fs.existsSync(videosUploadDir)) {
  fs.mkdirSync(videosUploadDir, { recursive: true });
}

// ================= MULTER SETUP =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, videosUploadDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

exports.upload = multer({ storage });


// =================================================
// ✅ CREATE
// =================================================
exports.createTeacherTraining = async (req, res) => {
  try {

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const training = new TeacherTraining({
      mainHeading: req.body.mainHeading,
      subHeading: req.body.subHeading,
      paragraph: req.body.paragraph,
      video: req.file ? req.file.filename : "",
    });

    await training.save();

    res.status(201).json({
      success: true,
      data: training,
    });

  } catch (error) {
    console.log("CREATE ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};


// =================================================
// ✅ GET ALL
// =================================================
exports.getTeacherTraining = async (req, res) => {
  try {

    const data = await TeacherTraining
      .find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// =================================================
// ✅ UPDATE
// =================================================
exports.updateTeacherTraining = async (req, res) => {
  try {

    const training =
      await TeacherTraining.findById(req.params.id);

    if (!training) {
      return res.status(404).json({
        message: "Data not found",
      });
    }

    // delete old video
    if (req.file && training.video) {
      const oldVideo = path.join(videosUploadDir, training.video);

      if (fs.existsSync(oldVideo)) {
        fs.unlinkSync(oldVideo);
      }
    }

    training.mainHeading =
      req.body.mainHeading;

    training.subHeading =
      req.body.subHeading;

    training.paragraph =
      req.body.paragraph;

    if (req.file) {
      training.video = req.file.filename;
    }

    await training.save();

    res.status(200).json({
      success: true,
      message: "Updated Successfully",
      data: training,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// =================================================
// ✅ DELETE
// =================================================
exports.deleteTeacherTraining = async (req, res) => {
  try {

    const training =
      await TeacherTraining.findById(req.params.id);

    if (!training) {
      return res.status(404).json({
        message: "Data not found",
      });
    }

    // delete video file
    if (training.video) {
      const filePath = path.join(videosUploadDir, training.video);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await training.deleteOne();

    res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
