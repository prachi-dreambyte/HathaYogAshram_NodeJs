const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  getAll,
  getOne,
  create,
  update,
  delete: deleteContent
} = require('../controllers/courses/ayurveda');

// Configure multer for multiple fields
const uploadFields = upload.fields([
  { name: 'heroImage', maxCount: 1 },
  { name: 'whatIsAyurvedaImage', maxCount: 1 },
  { name: 'teacherTrainingImage', maxCount: 1 },
  { name: 'FoodImage', maxCount: 1 },
  { name: 'benefitsImage', maxCount: 1 }
]);

router.route('/')
  .get(getAll)
  .post(uploadFields, create);

router.route('/:id')
  .get(getOne)
  .put(uploadFields, update)
  .delete(deleteContent);

module.exports = router;