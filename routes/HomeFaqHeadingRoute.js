const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  getAllSections,
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
} = require('../controllers/homepage/FaqHeading');

// GET    /api/faq
router.get('/', getAllSections);

// GET    /api/faq/:id
router.get('/:id', getSectionById);

// POST   /api/faq       (multipart/form-data with optional image field)
router.post('/', upload.single('image'), createSection);

// PUT    /api/faq/:id   (multipart/form-data with optional image field)
router.put('/:id', upload.single('image'), updateSection);

// DELETE /api/faq/:id
router.delete('/:id', deleteSection);

module.exports = router;