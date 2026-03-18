const mongoose = require("mongoose");

const ContactUsSchema = new mongoose.Schema(
  {
    heading: { type: String, default: "Let's Start a Conversation" },
    subheading: { type: String, default: "Connect • Transform • Transcend" },
    description: {
      type: String,
      default:
        "Whether you seek guidance on our teacher training programs, retreat experiences, or wish to deepen your practice, our devoted team is here to illuminate your path.",
    },
    whatsappNumber: { type: String, default: "7417539900" },
    phone: { type: String, default: "+91 9335606336" },
    email: { type: String, default: "info@hathayogashram.com" },
    openHours: { type: String, default: "Mon - Sat: 6 AM - 8 PM" },
    locationName: { type: String, default: "Hatha Yogashram" },
    addressLine1: { type: String, default: "Upper Tapovan, Rishikesh" },
    addressLine2: { type: String, default: "Uttarakhand 249192, India" },
    mapEmbedUrl: { type: String, default: "" },
    mapUrl: { type: String, default: "" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactUs", ContactUsSchema);

