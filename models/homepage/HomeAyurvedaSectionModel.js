const mongoose = require("mongoose");

const HomeAyurvedaSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Discover Ayurveda Courses",
    },
    subtitle: {
      type: String,
      default: "Ayurveda Wellness & Healing Programs",
    },
    description: {
      type: String,
      default:
        'Ayurveda, the ancient "science of life," offers a holistic path to balance your body, mind, and spirit. At Hatha Yogashram, we integrate Ayurveda deeply into our yoga teacher trainings and therapies — from the three doshas and Dinacharya to Shirodhara and seasonal practices.',
    },
    imageUrl: {
      type: String,
      default: "",
    },
    bookPath: {
      type: String,
      default: "/BookingForm",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HomeAyurvedaSection", HomeAyurvedaSectionSchema);
