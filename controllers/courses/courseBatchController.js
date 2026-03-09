const CourseBatch = require("../../models/courses/CourseBatchModel");
const Course = require("../../models/courses/CourseModel");

exports.getAll = async (req, res) => {
  try {
    const query = {};
    if (req.query.course) query.course = req.query.course;
    const data = await CourseBatch.find(query).sort({ startDate: 1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await CourseBatch.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const course = await Course.findById(req.body.course);
    if (!course) return res.status(400).json({ success: false, message: "Invalid course" });

    const data = await CourseBatch.create({
      course: req.body.course,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      capacity: req.body.capacity,
      priceShared: req.body.priceShared,
      priceSharedOld: req.body.priceSharedOld,
      pricePrivate: req.body.pricePrivate,
      pricePrivateOld: req.body.pricePrivateOld,
      status: req.body.status,
    });
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await CourseBatch.findByIdAndUpdate(
      req.params.id,
      {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        capacity: req.body.capacity,
        priceShared: req.body.priceShared,
        priceSharedOld: req.body.priceSharedOld,
        pricePrivate: req.body.pricePrivate,
        pricePrivateOld: req.body.pricePrivateOld,
        status: req.body.status,
      },
      { new: true }
    );
    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await CourseBatch.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
