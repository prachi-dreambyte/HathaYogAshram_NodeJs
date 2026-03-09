const mongoose = require("mongoose");
const CourseBooking = require("../../models/courses/CourseBookingModel");
const CourseBatch = require("../../models/courses/CourseBatchModel");

const getBookedSeats = async (batchId, excludeId = null) => {
  const match = {
    batch: new mongoose.Types.ObjectId(batchId),
    status: { $ne: "cancelled" },
  };
  if (excludeId) {
    match._id = { $ne: new mongoose.Types.ObjectId(excludeId) };
  }

  const bookings = await CourseBooking.aggregate([
    { $match: match },
    { $group: { _id: "$batch", total: { $sum: "$seats" } } },
  ]);
  return bookings[0]?.total || 0;
};

exports.create = async (req, res) => {
  try {
    const batch = await CourseBatch.findById(req.body.batch);
    if (!batch) {
      return res.status(400).json({ success: false, message: "Invalid batch" });
    }
    if (req.body.course && String(batch.course) !== String(req.body.course)) {
      return res.status(400).json({ success: false, message: "Course does not match batch" });
    }

    const requestedSeats = Number(req.body.seats || 1);
    const bookedSeats = await getBookedSeats(batch._id);
    const availableSeats = Math.max((batch.capacity || 0) - bookedSeats, 0);

    if (requestedSeats > availableSeats) {
      return res.status(400).json({
        success: false,
        message: "Not enough seats available",
      });
    }

    const booking = await CourseBooking.create({
      course: req.body.course || batch.course,
      batch: req.body.batch,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      country: req.body.country,
      source: req.body.source,
      seats: requestedSeats,
      status: req.body.status || "confirmed",
    });

    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const query = {};
    if (req.query.course) query.course = req.query.course;
    if (req.query.batch) query.batch = req.query.batch;
    let dataQuery = CourseBooking.find(query).sort({ createdAt: -1 });
    if (req.query.populate !== "false") {
      dataQuery = dataQuery
        .populate("course", "title slug shortTitle")
        .populate("batch");
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

    const nextStatus = req.body.status ?? booking.status;
    const nextSeatsRaw = req.body.seats ?? booking.seats;
    const nextSeats = Number(nextSeatsRaw);

    if (!Number.isFinite(nextSeats) || nextSeats <= 0) {
      return res.status(400).json({ success: false, message: "Invalid seats value" });
    }

    if (nextStatus !== "cancelled") {
      const batch = await CourseBatch.findById(booking.batch);
      if (!batch) {
        return res.status(400).json({ success: false, message: "Invalid batch" });
      }

      const bookedSeats = await getBookedSeats(batch._id, booking._id);
      const availableSeats = Math.max((batch.capacity || 0) - bookedSeats, 0);

      if (nextSeats > availableSeats) {
        return res.status(400).json({
          success: false,
          message: "Not enough seats available",
        });
      }
    }

    booking.name = req.body.name ?? booking.name;
    booking.email = req.body.email ?? booking.email;
    booking.phone = req.body.phone ?? booking.phone;
    booking.address = req.body.address ?? booking.address;
    booking.country = req.body.country ?? booking.country;
    booking.source = req.body.source ?? booking.source;
    booking.seats = nextSeats;
    booking.status = nextStatus;

    await booking.save();
    res.json({ success: true, data: booking });
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
