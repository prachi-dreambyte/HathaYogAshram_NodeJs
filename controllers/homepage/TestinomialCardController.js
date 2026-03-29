const fs = require("fs");
const path = require("path");
const Testimonial = require("../../models/homepage/TestinomialCard");

const deleteImageFile = (filename) => {
  if (!filename || /^https?:\/\//i.test(filename)) return;
  const cleanName = filename.replace(/^\/?uploads\//, "");
  const filePath = path.resolve(__dirname, "../../uploads", cleanName);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
};

const parseBoolean = (value, fallback = true) => {
  if (value === undefined) return fallback;
  if (typeof value === "boolean") return value;
  return String(value).toLowerCase() === "true";
};

const parseNumber = (value, fallback) => {
  if (value === undefined || value === null || value === "") return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const resolveImageValue = (req) => {
  if (req.file?.filename) return req.file.filename;
  if (typeof req.body.imageUrl === "string") return req.body.imageUrl.trim();
  if (typeof req.body.image === "string") return req.body.image.trim();
  return "";
};

// GET /api/testimonials — fetch all
const getAllTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: testimonials.length, data: testimonials });
  } catch (err) {
    next(err);
  }
};

// GET /api/testimonials/:id — fetch one
const getTestimonialById = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    res.json({ success: true, data: testimonial });
  } catch (err) {
    next(err);
  }
};

// POST /api/testimonials — create
const createTestimonial = async (req, res, next) => {
  try {
    const { name, location, quote } = req.body;
    const testimonial = await Testimonial.create({
      name,
      location,
      quote,
      image: resolveImageValue(req),
      rating: parseNumber(req.body.rating, 5),
      order: parseNumber(req.body.order, 0),
      isActive: parseBoolean(req.body.isActive, true),
    });
    res.status(201).json({ success: true, message: 'Testimonial created', data: testimonial });
  } catch (err) {
    if (req.file) deleteImageFile(req.file.filename);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    next(err);
  }
};

// PUT /api/testimonials/:id — update
const updateTestimonial = async (req, res, next) => {
  try {
    const existing = await Testimonial.findById(req.params.id);
    if (!existing) {
      if (req.file) deleteImageFile(req.file.filename);
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    let image = existing.image;
    if (req.file) {
      deleteImageFile(existing.image);
      image = req.file.filename;
    } else if (req.body.removeImage === "true") {
      deleteImageFile(existing.image);
      image = "";
    } else if (typeof req.body.imageUrl === "string") {
      image = req.body.imageUrl.trim();
    } else if (typeof req.body.image === "string" && req.body.image.trim()) {
      image = req.body.image.trim();
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        location: req.body.location,
        quote: req.body.quote,
        image,
        rating: parseNumber(req.body.rating, existing.rating ?? 5),
        order: parseNumber(req.body.order, existing.order ?? 0),
        isActive: parseBoolean(req.body.isActive, existing.isActive !== false),
      },
      { new: true, runValidators: true }
    );
    res.json({ success: true, message: 'Testimonial updated', data: testimonial });
  } catch (err) {
    if (req.file) deleteImageFile(req.file.filename);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    next(err);
  }
};

// DELETE /api/testimonials/:id — delete
const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    deleteImageFile(testimonial.image);
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
