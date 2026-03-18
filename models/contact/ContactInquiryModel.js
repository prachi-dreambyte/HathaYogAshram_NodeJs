const mongoose = require("mongoose");

const ContactInquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, default: "", trim: true, lowercase: true },
    phone: { type: String, default: "", trim: true },
    subject: { type: String, default: "", trim: true },
    message: { type: String, required: true, trim: true },
    source: { type: String, default: "contact-us", trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactInquiry", ContactInquirySchema);

