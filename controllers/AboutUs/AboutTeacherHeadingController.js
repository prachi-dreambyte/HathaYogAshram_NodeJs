const AboutTeacher = require("../../models/AboutUs/AboutTeacherHeadingModels");

exports.createAboutTeacher = async (req, res) => {
  try {
    const body = JSON.parse(req.body.data);

    // Files mapping
    const files = req.files;

    // Banner Image
    if (files.bannerImage) {
      body.banner.bannerImage = files.bannerImage[0].filename;
    }

    // Teacher Images
    body.teacherSection.teachers.forEach((teacher, index) => {
      if (files[`teacherImage_${index}`]) {
        teacher.teacherImage = files[`teacherImage_${index}`][0].filename;
      }
    });

    // Videos
    body.videoSection.videos.forEach((video, index) => {
      if (files[`video_${index}`]) {
        video.video = files[`video_${index}`][0].filename;
      }
      if (files[`thumbnail_${index}`]) {
        video.thumbnail = files[`thumbnail_${index}`][0].filename;
      }
    });

    const newData = new AboutTeacher(body);
    await newData.save();

    res.status(201).json({ message: "Saved Successfully", data: newData });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


// GET
exports.getAll = async (req, res) => {
  const data = await AboutTeacher.find();
  res.json(data);
};