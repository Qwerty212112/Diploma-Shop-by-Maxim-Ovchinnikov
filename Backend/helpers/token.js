const jwt = require("jsonwebtoken");

function getSecret() {
  const secret = process.env.JWT_SECRET;
  const isProduction = process.env.NODE_ENV === "production";

  if (!secret && isProduction) {
    throw new Error("JWT_SECRET is not set");
  }

  return secret || "dev-jwt-secret-change-me";
}

module.exports = {
  generate(data) {
    return jwt.sign(data, getSecret(), { expiresIn: "30d" });
  },
  verify(token) {
    return jwt.verify(token, getSecret());
  },
};
