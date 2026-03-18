const ContactInquiry = require("../models/contact/ContactInquiryModel");

exports.create = async (req, res) => {
  try {
    const name = String(req.body?.name || "").trim();
    const email = String(req.body?.email || "").trim();
    const phone = String(req.body?.phone || "").trim();
    const subject = String(req.body?.subject || "").trim();
    const message = String(req.body?.message || "").trim();

    if (!name || !message) {
      return res.status(400).json({
        success: false,
        message: "Name and message are required.",
      });
    }

    const saved = await ContactInquiry.create({
      name,
      email,
      phone,
      subject,
      message,
      source: "contact-us",
    });

    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const limit = Math.min(Math.max(parseInt(req.query.limit || "50", 10), 1), 200);
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      ContactInquiry.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      ContactInquiry.countDocuments(),
    ]);

    res.json({
      success: true,
      data: {
        items,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

