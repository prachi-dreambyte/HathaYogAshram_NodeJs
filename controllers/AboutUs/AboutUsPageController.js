const AboutUsPage = require("../../models/AboutUs/AboutUsPageModel");

const getLatestRecord = () =>
  AboutUsPage.findOne().sort({ updatedAt: -1, createdAt: -1 });

const parseBody = (req) => {
  if (req.body?.data) {
    return JSON.parse(req.body.data);
  }
  return req.body || {};
};

const applyUploadedFiles = (body, files = {}) => {
  const payload = {
    ...body,
    hero: { ...(body.hero || {}) },
    overview: { ...(body.overview || {}) },
  };

  if (files.heroImage?.[0]) {
    payload.hero.heroImage = files.heroImage[0].filename;
  }

  if (files.aboutImage?.[0]) {
    payload.overview.aboutImage = files.aboutImage[0].filename;
  }

  return payload;
};

exports.getAboutUsPage = async (req, res) => {
  try {
    const item = await getLatestRecord();
    res.json({ success: true, data: item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createAboutUsPage = async (req, res) => {
  try {
    const body = applyUploadedFiles(parseBody(req), req.files);
    const existing = await getLatestRecord();

    let saved;
    if (existing) {
      Object.assign(existing, body);
      saved = await existing.save();
    } else {
      saved = await AboutUsPage.create(body);
    }

    res.status(201).json({
      success: true,
      message: "About Us page saved successfully",
      data: saved,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateAboutUsPage = async (req, res) => {
  try {
    const existing = await AboutUsPage.findById(req.params.id);
    if (!existing) {
      return res
        .status(404)
        .json({ success: false, message: "About Us page record not found" });
    }

    const body = applyUploadedFiles(parseBody(req), req.files);
    Object.assign(existing, body);
    const saved = await existing.save();

    res.json({
      success: true,
      message: "About Us page updated successfully",
      data: saved,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
