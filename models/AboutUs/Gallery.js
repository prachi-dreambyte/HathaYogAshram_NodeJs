const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({

  category: {
    type: String,
    required: true
  },

  img: [
    {
      type: String
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model("GalleryHeading", gallerySchema);