const User = require("../models/UserModel");
const { hashPassword } = require("./password");
const {
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_NAME,
  DEFAULT_ADMIN_PASSWORD,
  DEFAULT_ADMIN_ROLE,
} = require("../config/defaultAdmin");

const ensureDefaultAdmin = async () => {
  const existing = await User.findOne({
    email: DEFAULT_ADMIN_EMAIL.toLowerCase(),
  });

  if (existing) return existing;

  return User.create({
    name: DEFAULT_ADMIN_NAME,
    email: DEFAULT_ADMIN_EMAIL.toLowerCase(),
    passwordHash: hashPassword(DEFAULT_ADMIN_PASSWORD),
    role: DEFAULT_ADMIN_ROLE,
  });
};

module.exports = ensureDefaultAdmin;
