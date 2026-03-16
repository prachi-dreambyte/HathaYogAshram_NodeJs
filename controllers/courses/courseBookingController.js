const CourseBooking = require("../../models/courses/CourseBookingModel");
const CourseBatch = require("../../models/courses/CourseBatchModel");
const {
  buildBatchView,
  buildBookedMap,
  ensureBookingFitsBatch,
  getRoomTypeLabel,
  normalizeBookingStatus,
  resolveRoomTypeForBatch,
} = require("../../utils/courseAvailability");

const buildPriceSnapshot = (batchView, roomType) => {
  const option = (batchView.roomOptions || []).find((item) => item.type === roomType);
  return {
    price: option?.price || "",
    priceOld: option?.priceOld || "",
  };
};

const populateBooking = (query) =>
  query
    .populate("course", "title slug shortTitle")
    .populate("batch", "startDate endDate status course");

exports.create = async (req, res) => {
  try {
    const batch = await CourseBatch.findById(req.body.batch);
    if (!batch) {
      return res.status(400).json({ success: false, message: "Invalid batch" });
    }

    const courseId = req.body.course || batch.course;
    if (String(batch.course) !== String(courseId)) {
      return res.status(400).json({ success: false, message: "Course does not match batch" });
    }

    const seats = Number(req.body.seats || 1);
    if (!Number.isFinite(seats) || seats <= 0) {
      return res.status(400).json({ success: false, message: "Invalid seats value" });
    }

    const status = normalizeBookingStatus(req.body.status);
    const roomType = resolveRoomTypeForBatch(batch, req.body.roomType);
    const bookedMap = await buildBookedMap([batch._id]);
    const batchView = buildBatchView(batch, bookedMap.get(String(batch._id)));

    if (status === "confirmed") {
      const fit = ensureBookingFitsBatch(batchView, roomType, seats);
      if (!fit.ok) {
        return res.status(400).json({ success: false, message: fit.message });
      }
    }

    const pricing = buildPriceSnapshot(batchView, roomType);

    const booking = await CourseBooking.create({
      course: courseId,
      batch: batch._id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      country: req.body.country,
      source: req.body.source,
      roomType,
      price: pricing.price,
      priceOld: pricing.priceOld,
      seats,
      status,
    });

    const populated = await populateBooking(CourseBooking.findById(booking._id));
    res.status(201).json({ success: true, data: populated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const query = {};
    if (req.query.course) query.course = req.query.course;
    if (req.query.batch) query.batch = req.query.batch;
    if (req.query.status) query.status = req.query.status;

    let dataQuery = CourseBooking.find(query).sort({ createdAt: -1 });
    if (req.query.populate !== "false") {
      dataQuery = populateBooking(dataQuery);
    }

    const data = await dataQuery;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const booking = await CourseBooking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    const nextBatchId = req.body.batch || booking.batch;
    const batch = await CourseBatch.findById(nextBatchId);
    if (!batch) {
      return res.status(400).json({ success: false, message: "Invalid batch" });
    }

    const nextCourseId = req.body.course || batch.course;
    if (String(batch.course) !== String(nextCourseId)) {
      return res.status(400).json({ success: false, message: "Course does not match batch" });
    }

    const nextStatus = normalizeBookingStatus(req.body.status || booking.status);
    const nextSeats = Number(req.body.seats ?? booking.seats);
    if (!Number.isFinite(nextSeats) || nextSeats <= 0) {
      return res.status(400).json({ success: false, message: "Invalid seats value" });
    }

    const nextRoomType = resolveRoomTypeForBatch(
      batch,
      req.body.roomType || booking.roomType
    );

    const bookedMap = await buildBookedMap([batch._id], {
      excludeBookingId: booking._id,
    });
    const batchView = buildBatchView(batch, bookedMap.get(String(batch._id)));

    if (nextStatus === "confirmed") {
      const fit = ensureBookingFitsBatch(batchView, nextRoomType, nextSeats);
      if (!fit.ok) {
        return res.status(400).json({ success: false, message: fit.message });
      }
    }

    const pricing = buildPriceSnapshot(batchView, nextRoomType);

    booking.course = nextCourseId;
    booking.batch = batch._id;
    booking.name = req.body.name ?? booking.name;
    booking.email = req.body.email ?? booking.email;
    booking.phone = req.body.phone ?? booking.phone;
    booking.address = req.body.address ?? booking.address;
    booking.country = req.body.country ?? booking.country;
    booking.source = req.body.source ?? booking.source;
    booking.roomType = nextRoomType;
    booking.price = pricing.price;
    booking.priceOld = pricing.priceOld;
    booking.seats = nextSeats;
    booking.status = nextStatus;

    await booking.save();

    const populated = await populateBooking(CourseBooking.findById(booking._id));
    res.json({ success: true, data: populated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await CourseBooking.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.meta = {
  getRoomTypeLabel,
};
