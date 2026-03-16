const crypto = require("crypto");

const DEFAULT_TTL_SECONDS = 60 * 60 * 24 * 7;

const base64UrlEncode = (value) =>
  Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

const base64UrlDecode = (value) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = 4 - (normalized.length % 4 || 4);
  const padded = normalized + "=".repeat(padding === 4 ? 0 : padding);
  return Buffer.from(padded, "base64").toString("utf8");
};

const getSecret = () => process.env.JWT_SECRET || "hatha-yogashram-dev-secret";

const signJwt = (payload, expiresInSeconds = DEFAULT_TTL_SECONDS) => {
  const header = { alg: "HS256", typ: "JWT" };
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const fullPayload = { ...payload, exp };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));
  const data = `${encodedHeader}.${encodedPayload}`;
  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(data)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return {
    token: `${data}.${signature}`,
    exp,
  };
};

const verifyJwt = (token) => {
  if (!token || typeof token !== "string") {
    throw new Error("Missing token");
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid token");
  }

  const [encodedHeader, encodedPayload, signature] = parts;
  const data = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = crypto
    .createHmac("sha256", getSecret())
    .update(data)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const left = Buffer.from(signature);
  const right = Buffer.from(expectedSignature);
  if (left.length !== right.length || !crypto.timingSafeEqual(left, right)) {
    throw new Error("Invalid token signature");
  }

  const payload = JSON.parse(base64UrlDecode(encodedPayload));
  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error("Token expired");
  }

  return payload;
};

module.exports = {
  signJwt,
  verifyJwt,
};
