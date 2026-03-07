const HomeVideoSection = require("../../models/homepage/HomepageVideoSectionModel");
const fs = require("fs");
const path = require("path");

// ─── Helper: delete old video file from disk ─────────────────
const deleteVideoFile = (filename) => {
  if (!filename) return;
  const filePath = path.join(__dirname, "../uploads", filename);
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) console.error("Failed to delete old video:", err.message);
    });
  }
};

// ─── GET ALL ──────────────────────────────────────────────────
const getAll = async (req, res) => {
  try {
    const records = await HomeVideoSection.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── GET ONE ──────────────────────────────────────────────────
const getOne = async (req, res) => {
  try {
    const record = await HomeVideoSection.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── CREATE ───────────────────────────────────────────────────
const create = async (req, res) => {
  try {
    const { heading, paragraph } = req.body;

    if (!heading || !paragraph) {
      return res.status(400).json({ success: false, message: "Heading and Paragraph are required" });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Video file is required" });
    }

    const newRecord = await HomeVideoSection.create({
      heading,
      paragraph,
      video: req.file.filename,
    });

    res.status(201).json({
      success: true,
      message: "Home Video Section created successfully",
      data: newRecord,
    });
  } catch (error) {
    // Clean up uploaded file if DB save failed
    if (req.file) deleteVideoFile(req.file.filename);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── UPDATE ───────────────────────────────────────────────────
const update = async (req, res) => {
  try {
    const record = await HomeVideoSection.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }

    const { heading, paragraph } = req.body;

    // Update text fields if provided
    if (heading) record.heading = heading;
    if (paragraph) record.paragraph = paragraph;

    // If a new video is uploaded, delete the old one and replace
    if (req.file) {
      deleteVideoFile(record.video);
      record.video = req.file.filename;
    }

    await record.save();

    res.status(200).json({
      success: true,
      message: "Home Video Section updated successfully",
      data: record,
    });
  } catch (error) {
    if (req.file) deleteVideoFile(req.file.filename);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── DELETE ───────────────────────────────────────────────────
const remove = async (req, res) => {
  try {
    const record = await HomeVideoSection.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }

    // Delete video file from disk
    deleteVideoFile(record.video);

    await record.deleteOne();

    res.status(200).json({
      success: true,
      message: "Home Video Section deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAll, getOne, create, update, remove };