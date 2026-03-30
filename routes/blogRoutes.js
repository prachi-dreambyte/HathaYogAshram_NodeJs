const express = require('express');
const router = express.Router();
const upload = require('../config/multer'); // your existing multer file
const {
  getAll,
  getOne,
  getBySlug,
  create,
  update,
  delete: deleteItem,
} = require('../controllers/blogController');

// Multer fields for two file inputs
const uploadFields = upload.fields([
  { name: 'heroImage', maxCount: 1 },
  { name: 'BlogMainImage', maxCount: 1 },
]);

router.route('/')
  .get(getAll)
  .post(uploadFields, create);

router.get('/slug/:slug', getBySlug);

router.route('/:id')
  .get(getOne)
  .put(uploadFields, update)
  .delete(deleteItem);

module.exports = router;
