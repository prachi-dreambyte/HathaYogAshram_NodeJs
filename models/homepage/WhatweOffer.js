const mongoose = require("mongoose");

const WhatWeOfferSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      required: [true, "Icon name is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    text: {
      type: String,
      required: [true, "Card text is required"],
      trim: true,
    },
    image: {
      type: String,
      default: null,
    },
    modalContent: {
      title: {
        type: String,
        required: [true, "Modal title is required"],
        trim: true,
      },
      description: {
        type: String,
        required: [true, "Modal description is required"],
        trim: true,
      },
      features: {
        type: [String],
        default: [],
      },
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WhatWeOffer", WhatWeOfferSchema);