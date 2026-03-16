const User = require("../models/UserModel");
const { verifyPassword } = require("../utils/password");
const { signJwt, verifyJwt } = require("../utils/jwt");

const getBearerToken = (req) => {
  const authHeader = req.headers.authorization || "";
  if (authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  return req.body?.token || "";
};

exports.login = async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const { token, exp } = signJwt({
      sub: String(user._id),
      email: user.email,
      role: user.role,
      name: user.name,
    });

    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
        exp,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.verify = async (req, res) => {
  try {
    const token = getBearerToken(req);
    const payload = verifyJwt(token);
    const user = await User.findById(payload.sub).select("name email role");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        exp: payload.exp,
      },
    });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};
