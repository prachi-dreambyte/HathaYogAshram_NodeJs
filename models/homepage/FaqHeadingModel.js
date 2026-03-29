const mongoose = require('mongoose');

const FaqItemSchema = new mongoose.Schema({
  question: { type: String, required: true, trim: true },
  answer:   { type: String, required: true, trim: true },
});

const FaqSectionSchema = new mongoose.Schema(
  {
    heading:    { type: String, required: true, trim: true },
    subheading: { type: String, trim: true, default: '' },
    image:      { type: String, default: '' }, // stored filename, e.g. "image-1234.jpg"
    faqs:       { type: [FaqItemSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FaqSection', FaqSectionSchema);