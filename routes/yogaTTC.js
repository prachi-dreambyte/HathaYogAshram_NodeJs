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

// Routes
router.route('/')
  .get(getAllContents)
  .post(upload.any(), createContent);

  
router.route('/:id')
  .get(getContentById)
  .put(upload.any(), updateContent)
  .delete(deleteContent);

module.exports = router;
