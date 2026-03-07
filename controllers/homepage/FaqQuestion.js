const Faq = require("../../models/homepage/FaqQuestionModel");

// GET all FAQs
exports.getAllFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.json({ data: faqs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE a new FAQ
exports.createFaq = async (req, res) => {
  const { mainHeading, subHeading } = req.body;
  const newFaq = new Faq({ mainHeading, subHeading });

  try {
    const savedFaq = await newFaq.save();
    res.status(201).json(savedFaq);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE FAQ
exports.updateFaq = async (req, res) => {
  try {
    const updatedFaq = await Faq.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedFaq);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE FAQ
exports.deleteFaq = async (req, res) => {
  try {
    await Faq.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};