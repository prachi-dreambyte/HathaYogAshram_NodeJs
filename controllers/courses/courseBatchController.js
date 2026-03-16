const CourseBatch = require("../../models/courses/CourseBatchModel");
const Course = require("../../models/courses/CourseModel");
const CourseBooking = require("../../models/courses/CourseBookingModel");
const {
  buildBatchView,
  buildBookedMap,
} = require("../../utils/courseAvailability");

const buildPayload = (body) => ({
  course: body.course,
  startDate: body.startDate,
  endDate: body.endDate,
  capacity: Number(body.capacity || 0),
  sharedCapacity: Number(body.sharedCapacity || 0),
  privateCapacity: Number(body.privateCapacity || 0),
  coupleCapacity: Number(body.coupleCapacity || 0),
  duplexCapacity: Number(body.duplexCapacity || 0),
  priceShared: body.priceShared,
  priceSharedOld: body.priceSharedOld,
  pricePrivate: body.pricePrivate,
  pricePrivateOld: body.pricePrivateOld,
  priceCouple: body.priceCouple,
  priceCoupleOld: body.priceCoupleOld || body.priceCoupledOld,
  priceDuplex: body.priceDuplex || body.priceDuelex,
  priceDuplexOld: body.priceDuplexOld || body.priceDuelexOld,
  status: body.status,
});

exports.getAll = async (req, res) => {
  try {
    const query = {};
    if (req.query.course) query.course = req.query.course;

    const batches = await CourseBatch.find(query)
      .populate("course", "title slug shortTitle")
      .sort({ startDate: 1 });
    const bookedMap = await buildBookedMap(batches.map((item) => item._id));
    const data = batches.map((item) => buildBatchView(item, bookedMap.get(String(item._id))));

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await CourseBatch.findById(req.params.id).populate(
      "course",
      "title slug shortTitle"
    );
    if (!item) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    const bookedMap = await buildBookedMap([item._id]);
    res.json({
      success: true,
      data: buildBatchView(item, bookedMap.get(String(item._id))),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const course = await Course.findById(req.body.course);
    if (!course) {
      return res.status(400).json({ success: false, message: "Invalid course" });
    }

    const created = await CourseBatch.create(buildPayload(req.body));
    const bookedMap = await buildBookedMap([created._id]);
    res.status(201).json({
      success: true,
      data: buildBatchView(created, bookedMap.get(String(created._id))),
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    if (req.body.course) {
      const course = await Course.findById(req.body.course);
      if (!course) {
        return res.status(400).json({ success: false, message: "Invalid course" });
      }
    }

    const updated = await CourseBatch.findByIdAndUpdate(
      req.params.id,
      buildPayload(req.body),
      { new: true, runValidators: true }
    ).populate("course", "title slug shortTitle");

    if (!updated) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    const bookedMap = await buildBookedMap([updated._id]);
    res.json({
      success: true,
      data: buildBatchView(updated, bookedMap.get(String(updated._id))),
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const activeBookings = await CourseBooking.countDocuments({
      batch: req.params.id,
      status: { $in: ["pending", "confirmed"] },
    });

    if (activeBookings > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete a batch with active bookings. Cancel or move the bookings first.",
      });
    }

    await CourseBatch.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
