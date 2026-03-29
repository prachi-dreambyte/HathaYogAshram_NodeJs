const AboutTeacher = require("../../models/AboutUs/AboutTeacherHeadingModels");

const getLatestRecord = () =>
  AboutTeacher.findOne().sort({ updatedAt: -1, createdAt: -1 });

const applyUploadedFiles = (body, files = {}) => {
  if (files.bannerImage?.[0]) {
    body.banner.bannerImage = files.bannerImage[0].filename;
  }

  (body.teacherSection?.teachers || []).forEach((teacher, index) => {
    if (files[`teacherImage_${index}`]?.[0]) {
      teacher.teacherImage = files[`teacherImage_${index}`][0].filename;
    }
  });

  (body.videoSection?.videos || []).forEach((video, index) => {
    if (files[`video_${index}`]?.[0]) {
      video.video = files[`video_${index}`][0].filename;
    }
    if (files[`thumbnail_${index}`]?.[0]) {
      video.thumbnail = files[`thumbnail_${index}`][0].filename;
    }
  });

  return body;
};

exports.createAboutTeacher = async (req, res) => {
  try {
    const body = applyUploadedFiles(JSON.parse(req.body.data), req.files);
    const existing = await getLatestRecord();

    let saved;
    if (existing) {
      existing.banner = body.banner;
      existing.teacherSection = body.teacherSection;
      existing.videoSection = body.videoSection;
      saved = await existing.save();
    } else {
      saved = await AboutTeacher.create(body);
    }

    res.status(201).json({
      success: true,
      message: "Saved Successfully",
      data: saved,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// GET
exports.getAll = async (req, res) => {
  try {
    const data = await AboutTeacher.find().sort({ updatedAt: -1, createdAt: -1 });
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateAboutTeacher = async (req, res) => {
  try {
    const existing = await AboutTeacher.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }

    const body = applyUploadedFiles(JSON.parse(req.body.data), req.files);
    existing.banner = body.banner;
    existing.teacherSection = body.teacherSection;
    existing.videoSection = body.videoSection;

    const saved = await existing.save();

    res.json({
      success: true,
      message: "Updated Successfully",
      data: saved,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
