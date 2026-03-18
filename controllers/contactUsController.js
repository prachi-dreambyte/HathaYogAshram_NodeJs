const ContactUs = require("../models/settings/ContactUsModel");

const pick = (obj, keys) => {
  const out = {};
  for (const key of keys) {
    if (obj[key] !== undefined) out[key] = obj[key];
  }
  return out;
};

exports.get = async (req, res) => {
  try {
    const doc = await ContactUs.findOne().sort({ createdAt: -1 });
    res.json({ success: true, data: doc || null });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.upsert = async (req, res) => {
  try {
    const body = pick(req.body || {}, [
      "heading",
      "subheading",
      "description",
      "whatsappNumber",
      "phone",
      "email",
      "openHours",
      "locationName",
      "addressLine1",
      "addressLine2",
      "mapEmbedUrl",
      "mapUrl",
    ]);

    if (req.user?._id) body.updatedBy = req.user._id;

    const updated = await ContactUs.findOneAndUpdate(
      {},
      { $set: body },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

