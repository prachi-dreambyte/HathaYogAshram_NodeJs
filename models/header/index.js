const mongoose = require("mongoose");

// ── Sub-schemas ───────────────────────────────────────────────────────────────

const NavLinkSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    path:  { type: String, required: true },
  },
  { _id: false }
);

const DropdownSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    links: { type: [NavLinkSchema], default: [] },
  },
  { _id: false }
);

// A nav item is either a plain link OR a dropdown (never both at once).
// type: "link" | "dropdown"
const NavItemSchema = new mongoose.Schema(
  {
    type:     { type: String, enum: ["link", "dropdown"], default: "link" },
    label:    { type: String, required: true },
    path:     { type: String },          // used when type === "link"
    dropdown: { type: DropdownSchema },  // used when type === "dropdown"
    side:     { type: String, enum: ["left", "right"], default: "left" },
    order:    { type: Number, default: 0 },
  },
  { _id: false }
);

// ── Main schema ───────────────────────────────────────────────────────────────
const HeaderSchema = new mongoose.Schema(
  {
    // Top bar
    address:    { type: String, default: "Hatha Yogashram, Balaknath Rd, Upper Tapovan, Rishikesh, Uttarakhand India 249192" },
    phone:      { type: String, default: "+91 9335606336" },
    yogaAllianceId: { type: String, default: "Yoga Alliance ID: 401771" },
    facebookUrl:    { type: String, default: "" },
    instagramUrl:   { type: String, default: "" },

    // Logo
    logoUrl: { type: String, default: "" },

    // CTA button (Register Now)
    ctaLabel: { type: String, default: "Register Now" },
    ctaPath:  { type: String, default: "/BookingForm" },

    // Nav items (left + right combined, ordered by `order` field)
    navItems: { type: [NavItemSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Header", HeaderSchema);