const BlogDetails = require('../models/blog/BlogModel');
const path = require('path');
const fs = require('fs').promises;

// Helper to delete an image file (if it exists)
const deleteImage = async (filename) => {
  if (!filename) return;
  const filePath = path.join(__dirname, '../uploads', filename);
  try {
    await fs.unlink(filePath);
  } catch (err) {
    // Ignore if file not found, but log other errors
    if (err.code !== 'ENOENT') {
      console.error('Failed to delete image:', err);
    }
  }
};

// @desc    Get all blog details
// @route   GET /api/blog-details
exports.getAll = async (req, res) => {
  try {
    const data = await BlogDetails.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get single blog details by id
// @route   GET /api/blog-details/:id
exports.getOne = async (req, res) => {
  try {
    const item = await BlogDetails.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Create new blog details
// @route   POST /api/blog-details
exports.create = async (req, res) => {
  try {
    const bodyData = { ...req.body };
    if (req.files) {
      if (req.files.heroImage) bodyData.heroImage = req.files.heroImage[0].filename;
      if (req.files.BlogMainImage) bodyData.BlogMainImage = req.files.BlogMainImage[0].filename;
    }

    const newItem = new BlogDetails(bodyData);
    await newItem.save();
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    // Clean up uploaded files on error
    if (req.files) {
      if (req.files.heroImage) await deleteImage(req.files.heroImage[0].filename);
      if (req.files.BlogMainImage) await deleteImage(req.files.BlogMainImage[0].filename);
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Update blog details
// @route   PUT /api/blog-details/:id
exports.update = async (req, res) => {
  try {
    const existing = await BlogDetails.findById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, error: 'Not found' });

    const updateData = { ...req.body };

    // Handle file updates
    if (req.files) {
      if (req.files.heroImage) {
        await deleteImage(existing.heroImage);
        updateData.heroImage = req.files.heroImage[0].filename;
      }
      if (req.files.BlogMainImage) {
        await deleteImage(existing.BlogMainImage);
        updateData.BlogMainImage = req.files.BlogMainImage[0].filename;
      }
    }

    const updated = await BlogDetails.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({ success: true, data: updated });
  } catch (error) {
    // Clean up newly uploaded files on error
    if (req.files) {
      if (req.files.heroImage) await deleteImage(req.files.heroImage[0].filename);
      if (req.files.BlogMainImage) await deleteImage(req.files.BlogMainImage[0].filename);
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Delete blog details
// @route   DELETE /api/blog-details/:id
exports.delete = async (req, res) => {
  try {
    const item = await BlogDetails.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Not found' });

    // Delete associated images
    await deleteImage(item.heroImage);
    await deleteImage(item.BlogMainImage);

    await item.deleteOne();
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};