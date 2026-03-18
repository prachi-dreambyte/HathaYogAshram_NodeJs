const User = require("../models/UserModel");
const { verifyJwt } = require("../utils/jwt");

const getBearerToken = (req) => {
  const authHeader = req.headers.authorization || "";
  if (authHeader.startsWith("Bearer ")) return authHeader.slice(7);
  return "";
};

exports.requireAuth = async (req, res, next) => {
  try {
    const token = getBearerToken(req);
    const payload = verifyJwt(token);
    const user = await User.findById(payload.sub).select("name email role");
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized." });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized." });
  }
};

exports.requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ success: false, message: "Forbidden." });
  }
  next();
};

