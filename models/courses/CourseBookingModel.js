const mongoose = require("mongoose");

const CourseBookingSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    batch: { type: mongoose.Schema.Types.ObjectId, ref: "CourseBatch", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    country: { type: String },
    source: { type: String },
    seats: { type: Number, default: 1 },
    status: { type: String, default: "confirmed" }, // confirmed | pending | cancelled
  },
  { timestamps: true }
);

module.exports = mongoose.model("CourseBooking", CourseBookingSchema);
