const AboutFounderSection = require("../../models/AboutUs/AboutFounderSection.Models");
const path = require("path");
const fs = require("fs");

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

// Parse the 4 video slots from multipart form fields + uploaded files
const parseVideos = (req) => {
  const videos = [];
  for (let i = 0; i < 4; i++) {
    const type = req.body[`videoType_${i}`];
    if (!type) continue;

    if (type === "link") {
      videos.push({ type: "link", url: req.body[`videoLink_${i}`] || "" });
    } else {
      // uploaded file key: videoFile_0, videoFile_1 …
      const fileKey = `videoFile_${i}`;
      const fileObj = req.files?.[fileKey]?.[0];
      videos.push({
        type: "upload",
        url: fileObj ? imageUrl(req, fileObj.filename) : "",
      });
    }
  }
  return videos;
};

// ── CRUD ──────────────────────────────────────────────────────────────────────

exports.getAll = async (req, res) => {
  try {
    const data = await AboutFounderSection.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await AboutFounderSection.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const body = {
      journeyHeading:   req.body.journeyHeading,
      journeyTitle:     req.body.journeyTitle,
      journeyParagraph: req.body.journeyParagraph,
      videoTitle:       req.body.videoTitle,
      videos:           parseVideos(req),
      lastHeading:      req.body.lastHeading,
      lastParagraph:    req.body.lastParagraph,
    };

    if (req.files?.lastIcon?.[0]) {
      body.lastIcon = imageUrl(req, req.files.lastIcon[0].filename);
    }

    const newItem = await AboutFounderSection.create(body);
    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const existing = await AboutFounderSection.findById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: "Not found" });

    const body = {
      journeyHeading:   req.body.journeyHeading,
      journeyTitle:     req.body.journeyTitle,
      journeyParagraph: req.body.journeyParagraph,
      videoTitle:       req.body.videoTitle,
      lastHeading:      req.body.lastHeading,
      lastParagraph:    req.body.lastParagraph,
    };

    // Rebuild videos: keep existing uploaded URL if no new file sent
    const updatedVideos = [];
    for (let i = 0; i < 4; i++) {
      const type = req.body[`videoType_${i}`];
      if (!type) continue;

      if (type === "link") {
        // Delete old uploaded file for this slot if it was an upload before
        if (existing.videos?.[i]?.type === "upload") {
          deleteFileFromUrl(existing.videos[i].url);
        }
        updatedVideos.push({ type: "link", url: req.body[`videoLink_${i}`] || "" });
      } else {
        const fileKey = `videoFile_${i}`;
        const fileObj = req.files?.[fileKey]?.[0];
        if (fileObj) {
          // New file uploaded — delete old one
          deleteFileFromUrl(existing.videos?.[i]?.url);
          updatedVideos.push({ type: "upload", url: imageUrl(req, fileObj.filename) });
        } else {
          // No new file — keep existing
          updatedVideos.push(existing.videos?.[i] || { type: "upload", url: "" });
        }
      }
    }
    body.videos = updatedVideos;

    // lastIcon
    if (req.files?.lastIcon?.[0]) {
      deleteFileFromUrl(existing.lastIcon);
      body.lastIcon = imageUrl(req, req.files.lastIcon[0].filename);
    }

    const updated = await AboutFounderSection.findByIdAndUpdate(req.params.id, body, { new: true });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const item = await AboutFounderSection.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Not found" });

    item.videos.forEach((v) => {
      if (v.type === "upload") deleteFileFromUrl(v.url);
    });
    deleteFileFromUrl(item.lastIcon);
    await item.deleteOne();

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};