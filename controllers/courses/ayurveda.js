const AyurvedaContent = require('../../models/courses/ayurveda');
const fs = require('fs');
const path = require('path');

// Helper to delete old image files when updating
const deleteImageFile = (filePath) => {
  const fullPath = path.join(__dirname, '..', filePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

// @desc    Get all Ayurveda content entries
// @route   GET /api/ayurveda-page
exports.getAll = async (req, res) => {
  try {
    const contents = await AyurvedaContent.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get single Ayurveda content by ID
// @route   GET /api/ayurveda-page/:id
exports.getOne = async (req, res) => {
  try {
    const content = await AyurvedaContent.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }
    res.json({ success: true, data: content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Create new Ayurveda content
// @route   POST /api/ayurveda-page
exports.create = async (req, res) => {
  try {
    // req.body contains all text fields
    // req.files contains uploaded files (from multer)
    const data = { ...req.body };

    // Handle file uploads: map field names to file paths
    const fileFields = ['heroImage', 'whatIsAyurvedaImage', 'teacherTrainingImage', 'FoodImage', 'benefitsImage'];
    fileFields.forEach(field => {
      if (req.files && req.files[field]) {
        data[field] = req.files[field][0].path; // multer stores file path
      }
    });

    // Parse JSON arrays if they were sent as strings (if frontend stringifies)
    ['connectionItems', 'benefitsItems', 'dinacharyaItems', 'therapyItems'].forEach(arrField => {
      if (data[arrField] && typeof data[arrField] === 'string') {
        try {
          data[arrField] = JSON.parse(data[arrField]);
        } catch (e) {
          // ignore
        }
      }
    });

    const content = new AyurvedaContent(data);
    await content.save();
    res.status(201).json({ success: true, data: content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update Ayurveda content
// @route   PUT /api/ayurveda-page/:id
exports.update = async (req, res) => {
  try {
    let content = await AyurvedaContent.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }

    const data = { ...req.body };

    // Handle file uploads: if new files are provided, delete old ones
    const fileFields = ['heroImage', 'whatIsAyurvedaImage', 'teacherTrainingImage', 'FoodImage', 'benefitsImage'];
    fileFields.forEach(field => {
      if (req.files && req.files[field]) {
        // Delete old image if exists
        if (content[field]) {
          deleteImageFile(content[field]);
        }
        data[field] = req.files[field][0].path;
      }
    });

    // Parse JSON arrays if they were sent as strings
    ['connectionItems', 'benefitsItems', 'dinacharyaItems', 'therapyItems'].forEach(arrField => {
      if (data[arrField] && typeof data[arrField] === 'string') {
        try {
          data[arrField] = JSON.parse(data[arrField]);
        } catch (e) {
          // ignore
        }
      }
    });

    // Update the document
    content = await AyurvedaContent.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, data: content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Delete Ayurveda content
// @route   DELETE /api/ayurveda-page/:id
exports.delete = async (req, res) => {
  try {
    const content = await AyurvedaContent.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }

    // Delete associated images
    const fileFields = ['heroImage', 'whatIsAyurvedaImage', 'teacherTrainingImage', 'FoodImage', 'benefitsImage'];
    fileFields.forEach(field => {
      if (content[field]) {
        deleteImageFile(content[field]);
      }
    });

    await content.remove();
    res.json({ success: true, message: 'Content deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};