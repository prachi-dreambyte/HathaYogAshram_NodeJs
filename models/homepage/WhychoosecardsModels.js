const mongoose = require("mongoose");

const HomeWhyChooseCardSchema = new mongoose.Schema(
{
  icon: {
    type: String,
    required: true
  },

  heading: {
    type: String,
    required: true
  },

  paragraph: {
    type: String,
    required: true
  },

  image: {
    type: String
  }

},
{ timestamps: true }
);

module.exports = mongoose.model(
"HomeWhyChooseCard",
HomeWhyChooseCardSchema
);