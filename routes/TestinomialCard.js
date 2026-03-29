const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/homepage/TestinomialCardController');

// GET    /api/testimonials
router.get('/', getAllTestimonials);

// GET    /api/testimonials/:id
router.get('/:id', getTestimonialById);

// POST   /api/testimonials
router.post('/', upload.single('image'), createTestimonial);

// PUT    /api/testimonials/:id
router.put('/:id', upload.single('image'), updateTestimonial);

// DELETE /api/testimonials/:id
router.delete('/:id', deleteTestimonial);

module.exports = router;
