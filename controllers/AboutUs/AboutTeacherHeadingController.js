const AboutTeacherHeading = require("../../models/AboutUs/AboutTeacherHeadingModels");
const path = require("path");
const fs   = require("fs");

// ── Helpers ───────────────────────────────────────────────────────────────────
const imageUrl = (req, filename) =>
  `${req.protocol}://${req.get("host")}/uploads/${filename}`;

const deleteFileFromUrl = (url) => {
  if (!url) return;
  const filename = url.split("/uploads/")[1];
  if (!filename) return;
  const filePath = path.join(__dirname, "../uploads", filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
};

// Parse 4 video slots from multipart fields + uploaded files
const parseVideos = (req, existingVideos = []) => {
  const videos = [];
  for (let i = 0; i < 4; i++) {
    const type    = req.body[`videoType_${i}`];
    const fileObj = req.files?.[`videoFile_${i}`]?.[0];
    const link    = req.body[`videoLink_${i}`] || "";

    if (!type) {
      // slot not sent — keep existing
      videos.push(existingVideos[i] || { type: "upload", url: "" });
      continue;
    }

    if (type === "link") {
      // switching to link — delete old uploaded file if any
      if (existingVideos[i]?.type === "upload") deleteFileFromUrl(existingVideos[i].url);
      videos.push({ type: "link", url: link });
    } else {
      if (fileObj) {
        // new file uploaded — delete old one
        deleteFileFromUrl(existingVideos[i]?.url);
        videos.push({ type: "upload", url: imageUrl(req, fileObj.filename) });
      } else {
        // no new file — keep existing url
        videos.push(existingVideos[i] || { type: "upload", url: "" });
      }
    }
  }
  return videos;
};

// ── CRUD ──────────────────────────────────────────────────────────────────────

exports.getAll = async (req, res) => {
  try {
    const data = await AboutTeacherHeading.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await AboutTeacherHeading.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const body = {
      mainHeading:    req.body.mainHeading,
      subHeading:     req.body.subHeading,
      paragraph:      req.body.paragraph,
      videoHeading:   req.body.videoHeading,
      videoSubHeading:req.body.videoSubHeading,
      videos:         parseVideos(req),
      lastHeading:    req.body.lastHeading,
      lastParagraph:  req.body.lastParagraph,
    };

    const newItem = await AboutTeacherHeading.create(body);
    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const existing = await AboutTeacherHeading.findById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: "Not found" });

    const body = {
      mainHeading:    req.body.mainHeading,
      subHeading:     req.body.subHeading,
      paragraph:      req.body.paragraph,
      videoHeading:   req.body.videoHeading,
      videoSubHeading:req.body.videoSubHeading,
      videos:         parseVideos(req, existing.videos),
      lastHeading:    req.body.lastHeading,
      lastParagraph:  req.body.lastParagraph,
    };

    const updated = await AboutTeacherHeading.findByIdAndUpdate(
      req.params.id, body, { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const item = await AboutTeacherHeading.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Not found" });

    item.videos.forEach((v) => {
      if (v.type === "upload") deleteFileFromUrl(v.url);
    });
    await item.deleteOne();

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};