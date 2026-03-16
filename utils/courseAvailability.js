const mongoose = require("mongoose");
const CourseBooking = require("../models/courses/CourseBookingModel");

const ROOM_TYPE_CONFIG = {
  shared: {
    label: "Shared Room",
    priceField: "priceShared",
    oldPriceField: "priceSharedOld",
    capacityField: "sharedCapacity",
  },
  private: {
    label: "Private Room",
    priceField: "pricePrivate",
    oldPriceField: "pricePrivateOld",
    capacityField: "privateCapacity",
  },
  couple: {
    label: "Couple Room",
    priceField: "priceCouple",
    oldPriceField: "priceCoupleOld",
    capacityField: "coupleCapacity",
  },
  duplex: {
    label: "Duplex Room",
    priceField: "priceDuplex",
    oldPriceField: "priceDuplexOld",
    capacityField: "duplexCapacity",
  },
};

const ROOM_TYPES = Object.keys(ROOM_TYPE_CONFIG);

const normalizeRoomType = (value) => {
  const normalized = String(value || "")
    .toLowerCase()
    .replace(/[\s_-]+/g, "");

  if (!normalized) return "";
  if (normalized === "sharing" || normalized === "sharedroom") return "shared";
  if (normalized === "privateroom") return "private";
  if (normalized === "coupleroom") return "couple";
  if (normalized === "duelex" || normalized === "duplexroom") return "duplex";
  return ROOM_TYPES.includes(normalized) ? normalized : "";
};

const normalizeBookingStatus = (value) => {
  const normalized = String(value || "").toLowerCase();
  if (["pending", "confirmed", "cancelled"].includes(normalized)) {
    return normalized;
  }
  return "pending";
};

const hasDedicatedRoomCapacities = (batch) =>
  ROOM_TYPES.some((type) => Number(batch?.[ROOM_TYPE_CONFIG[type].capacityField] || 0) > 0);

const getEnabledRoomTypes = (batch) => {
  const configured = ROOM_TYPES.filter((type) => {
    const config = ROOM_TYPE_CONFIG[type];
    return Boolean(
      batch?.[config.priceField] ||
        batch?.[config.oldPriceField] ||
        Number(batch?.[config.capacityField] || 0) > 0
    );
  });

  if (configured.length) return configured;
  return ["shared", "private"];
};

const getTotalCapacity = (batch) => {
  if (hasDedicatedRoomCapacities(batch)) {
    return ROOM_TYPES.reduce(
      (sum, type) => sum + Number(batch?.[ROOM_TYPE_CONFIG[type].capacityField] || 0),
      0
    );
  }
  return Number(batch?.capacity || 0);
};

const getRoomTypeLabel = (type) => ROOM_TYPE_CONFIG[type]?.label || "General";

const getRoomTypePrice = (batch, type) => {
  const config = ROOM_TYPE_CONFIG[type];
  if (!config) return { price: "", oldPrice: "" };
  return {
    price: batch?.[config.priceField] || "",
    oldPrice: batch?.[config.oldPriceField] || "",
  };
};

const resolveRoomTypeForBatch = (batch, value) => {
  const enabled = getEnabledRoomTypes(batch);
  const normalized = normalizeRoomType(value);
  if (normalized && enabled.includes(normalized)) return normalized;
  if (enabled.includes("shared")) return "shared";
  return enabled[0] || "";
};

const buildBookedMap = async (batchIds, { excludeBookingId } = {}) => {
  if (!batchIds.length) return new Map();

  const match = {
    batch: { $in: batchIds.map((id) => new mongoose.Types.ObjectId(id)) },
    status: "confirmed",
  };

  if (excludeBookingId) {
    match._id = { $ne: new mongoose.Types.ObjectId(excludeBookingId) };
  }

  const rows = await CourseBooking.aggregate([
    { $match: match },
    {
      $group: {
        _id: { batch: "$batch", roomType: "$roomType" },
        total: { $sum: "$seats" },
      },
    },
  ]);

  const map = new Map();
  rows.forEach((row) => {
    const key = String(row._id.batch);
    const current = map.get(key) || { total: 0, byType: {}, unknown: 0 };
    const roomType = normalizeRoomType(row._id.roomType);

    current.total += Number(row.total || 0);
    if (roomType) {
      current.byType[roomType] = (current.byType[roomType] || 0) + Number(row.total || 0);
    } else {
      current.unknown += Number(row.total || 0);
    }
    map.set(key, current);
  });

  return map;
};

const buildBatchView = (batch, bookedData = { total: 0, byType: {}, unknown: 0 }) => {
  const raw = typeof batch?.toObject === "function" ? batch.toObject() : { ...batch };
  const dedicatedCapacities = hasDedicatedRoomCapacities(raw);
  const totalCapacity = getTotalCapacity(raw);
  const confirmedSeats = Number(bookedData.total || 0);
  const availableSeats = Math.max(totalCapacity - confirmedSeats, 0);
  const enabledRoomTypes = getEnabledRoomTypes(raw);

  const roomOptions = enabledRoomTypes.map((type) => {
    const config = ROOM_TYPE_CONFIG[type];
    const typeCapacity = dedicatedCapacities
      ? Number(raw?.[config.capacityField] || 0)
      : totalCapacity;
    const confirmedTypeSeats = dedicatedCapacities
      ? Number(bookedData.byType?.[type] || 0)
      : confirmedSeats;
    const typeAvailableSeats = Math.max(typeCapacity - confirmedTypeSeats, 0);
    const pricing = getRoomTypePrice(raw, type);

    return {
      type,
      label: getRoomTypeLabel(type),
      price: pricing.price,
      priceOld: pricing.oldPrice,
      capacity: typeCapacity,
      confirmedSeats: confirmedTypeSeats,
      availableSeats: typeAvailableSeats,
      available: typeAvailableSeats > 0,
      sharedPool: !dedicatedCapacities,
    };
  });

  let statusLabel = raw.status;
  let statusType = "primary";
  if (!statusLabel) {
    statusLabel = availableSeats <= 0 ? "Fully Booked" : `${availableSeats} Seats Left`;
    statusType = availableSeats <= 0 ? "success" : "primary";
  } else {
    const lower = statusLabel.toLowerCase();
    if (lower.includes("waiting")) statusType = "warning";
    if (lower.includes("fully")) statusType = "success";
  }

  return {
    ...raw,
    capacity: totalCapacity,
    confirmedSeats,
    availableSeats,
    hasDedicatedRoomCapacities: dedicatedCapacities,
    roomOptions,
    typeOptions: roomOptions,
    statusLabel,
    statusType,
    priceDuelex: raw.priceDuplex || "",
    priceDuelexOld: raw.priceDuplexOld || "",
  };
};

const ensureBookingFitsBatch = (batchView, roomType, seats) => {
  const selectedType = normalizeRoomType(roomType);
  const option = (batchView.roomOptions || []).find((item) => item.type === selectedType);

  if (!option) {
    return { ok: false, message: "Please select a valid booking type." };
  }

  if (Number(seats || 0) <= 0) {
    return { ok: false, message: "Invalid seats value." };
  }

  if (option.availableSeats < seats) {
    return {
      ok: false,
      message: `${option.label} does not have enough seats available.`,
    };
  }

  if (batchView.availableSeats < seats) {
    return { ok: false, message: "Not enough seats available in this batch." };
  }

  return { ok: true, option };
};

module.exports = {
  ROOM_TYPE_CONFIG,
  ROOM_TYPES,
  normalizeRoomType,
  normalizeBookingStatus,
  hasDedicatedRoomCapacities,
  getEnabledRoomTypes,
  getTotalCapacity,
  getRoomTypeLabel,
  getRoomTypePrice,
  resolveRoomTypeForBatch,
  buildBookedMap,
  buildBatchView,
  ensureBookingFitsBatch,
};
