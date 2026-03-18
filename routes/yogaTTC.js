const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  getAllContents,
  getContentById,
  createContent,
  updateContent,
  deleteContent
} = require('../controllers/courses/yogaYTTC');

// Configure multer for multiple file fields
const uploadFields = upload.fields([
  { name: 'heroImage', maxCount: 1 },
  { name: 'whyUsImage', maxCount: 1 },
  { name: 'courses[0][image]', maxCount: 10 },
  { name: 'courses[1][image]', maxCount: 10 },
  { name: 'courses[2][image]', maxCount: 10 },
  { name: 'courses[3][image]', maxCount: 10 },
  { name: 'courses[4][image]', maxCount: 10 },
  { name: 'courses[5][image]', maxCount: 10 },
  { name: 'bookingCourses[0][image]', maxCount: 10 },
  { name: 'bookingCourses[1][image]', maxCount: 10 },
  { name: 'bookingCourses[2][image]', maxCount: 10 },
  { name: 'bookingCourses[3][image]', maxCount: 10 },
  { name: 'bookingCourses[4][image]', maxCount: 10 },
  { name: 'bookingCourses[5][image]', maxCount: 10 },
  { name: 'certificationLogos[0][image]', maxCount: 1 },
  { name: 'certificationLogos[1][image]', maxCount: 1 },
  { name: 'certificationLogos[2][image]', maxCount: 1 },
  { name: 'certificationLogos[3][image]', maxCount: 1 }
]);

// Routes
router.route('/')
  .get(getAllContents)
  .post(uploadFields, createContent);

  
router.route('/:id')
  .get(getContentById)
  .put(uploadFields, updateContent)
  .delete(deleteContent);

module.exports = router;