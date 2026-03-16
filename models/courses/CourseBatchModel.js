const mongoose = require("mongoose");

const CourseBatchSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    capacity: { type: Number, default: 0 },
    sharedCapacity: { type: Number, default: 0 },
    privateCapacity: { type: Number, default: 0 },
    coupleCapacity: { type: Number, default: 0 },
    duplexCapacity: { type: Number, default: 0 },
    priceShared: { type: String },
    priceSharedOld: { type: String },
    pricePrivate: { type: String },
    pricePrivateOld: { type: String },
    priceCouple: { type: String },
    priceCoupleOld: { type: String },
    priceDuplex: { type: String },
    priceDuplexOld: { type: String },
    status: { type: String }, // Optional override (e.g., Waiting List)
  },
  { timestamps: true }
);

module.exports = mongoose.model("CourseBatch", CourseBatchSchema);
