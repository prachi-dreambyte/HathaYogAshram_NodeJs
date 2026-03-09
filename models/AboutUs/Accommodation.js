const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema({

  sectionTitle: String,
  description: String,

  feature1: String,
  feature2: String,
  feature3: String,
  feature4: String,
  feature5: String,

  building1Title: String,
  building1Images: [String],

  building2Title: String,
  building2Images: [String],

  note: String,

  foodTitle: String,
  foodDescription: String,

  foodFeature1: String,
  foodFeature2: String,
  foodFeature3: String,
  foodFeature4: String,

  foodImages: [String]

}, { timestamps: true });

module.exports = mongoose.model("Accommodation", accommodationSchema);