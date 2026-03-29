const fs = require('fs');
const path = require('path');
const FaqSection = require('../../models/homepage/FaqHeadingModel');

// Helper: delete image file from disk
const deleteImageFile = (filename) => {
  if (!filename) return;
  const filePath = path.join(__dirname, '..', 'uploads', filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
};

// GET /api/faq — get all sections
const getAllSections = async (req, res) => {
  try {
    const sections = await FaqSection.find().sort({ createdAt: -1 });
    res.json({ success: true, data: sections });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/faq/:id — get single section
const getSectionById = async (req, res) => {
  try {
    const section = await FaqSection.findById(req.params.id);
    if (!section) return res.status(404).json({ success: false, message: 'Section not found' });
    res.json({ success: true, data: section });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/faq — create section
const createSection = async (req, res) => {
  try {
    const { heading, subheading, faqs } = req.body;

    if (!heading) {
      if (req.file) deleteImageFile(req.file.filename);
      return res.status(400).json({ success: false, message: 'Heading is required' });
    }

    // faqs comes as JSON string from FormData
    let parsedFaqs = [];
    if (faqs) {
      try { parsedFaqs = JSON.parse(faqs); } catch { parsedFaqs = []; }
    }

    const section = await FaqSection.create({
      heading,
      subheading: subheading || '',
      image: req.file ? req.file.filename : '',
      faqs: parsedFaqs,
    });

    res.status(201).json({ success: true, data: section });
  } catch (err) {
    if (req.file) deleteImageFile(req.file.filename);
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/faq/:id — update section
const updateSection = async (req, res) => {
  try {
    const section = await FaqSection.findById(req.params.id);
    if (!section) {
      if (req.file) deleteImageFile(req.file.filename);
      return res.status(404).json({ success: false, message: 'Section not found' });
    }

    const { heading, subheading, faqs, removeImage } = req.body;

    if (!heading) {
      if (req.file) deleteImageFile(req.file.filename);
      return res.status(400).json({ success: false, message: 'Heading is required' });
    }

    // Handle image replacement / removal
    if (req.file) {
      // New image uploaded — delete old one
      deleteImageFile(section.image);
      section.image = req.file.filename;
    } else if (removeImage === 'true') {
      // Explicitly remove image
      deleteImageFile(section.image);
      section.image = '';
    }

    section.heading    = heading;
    section.subheading = subheading || '';

    if (faqs) {
      try { section.faqs = JSON.parse(faqs); } catch { section.faqs = []; }
    }

    await section.save();
    res.json({ success: true, data: section });
  } catch (err) {
    if (req.file) deleteImageFile(req.file.filename);
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/faq/:id — delete section
const deleteSection = async (req, res) => {
  try {
    const section = await FaqSection.findById(req.params.id);
    if (!section) return res.status(404).json({ success: false, message: 'Section not found' });

    deleteImageFile(section.image);
    await FaqSection.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Section deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAllSections, getSectionById, createSection, updateSection, deleteSection };