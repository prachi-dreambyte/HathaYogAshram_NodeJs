const mongoose = require("mongoose");

const HomeRetreatSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Yoga Meditation Retreat",
    },
    highlightText: {
      type: String,
      default: "in Rishikesh",
    },
    description: {
      type: String,
      default:
        "Elevate your life with an unforgettable yoga retreat experience. Discover and book rejuvenating yoga retreats, vacations, and yoga teacher training courses at Hatha Yogashram",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HomeRetreatSection", HomeRetreatSectionSchema);
