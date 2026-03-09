const BlogPage = require("../models/blog/BlogPageModel");

const buildBody = (req) => ({
  topLabel: req.body.topLabel,
  title: req.body.title,
  breadcrumbLabel: req.body.breadcrumbLabel,
  sectionTitle: req.body.sectionTitle,
  description: req.body.description,
});

exports.get = async (req, res) => {
  try {
    const item = await BlogPage.findOne().sort({ updatedAt: -1 });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.upsert = async (req, res) => {
  try {
    const existing = await BlogPage.findOne().sort({ updatedAt: -1 });
    if (existing) {
      const updated = await BlogPage.findByIdAndUpdate(
        existing._id,
        buildBody(req),
        { new: true }
      );
      return res.json({ success: true, data: updated });
    }
    const created = await BlogPage.create(buildBody(req));
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
