const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({

  image: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  place: {
    type: String,
    required: true
  },

  review: {
    type: String,
    required: true
  },

  stars: {
    type: Number,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Testimonial", testimonialSchema);