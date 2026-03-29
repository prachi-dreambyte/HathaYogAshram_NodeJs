const express = require('express');
const router = express.Router();
const {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonial.controller');

// GET    /api/testimonials
router.get('/', getAllTestimonials);

// GET    /api/testimonials/:id
router.get('/:id', getTestimonialById);

// POST   /api/testimonials
router.post('/', createTestimonial);

// PUT    /api/testimonials/:id
router.put('/:id', updateTestimonial);

// DELETE /api/testimonials/:id
router.delete('/:id', deleteTestimonial);

module.exports = router;