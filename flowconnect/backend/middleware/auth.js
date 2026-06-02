const jwt = require("jsonwebtoken");

/**
 * Verify the Bearer JWT sent in the Authorization header.
 * Attaches the decoded payload to req.user on success.
 * Returns 401 if the header is absent or the token is invalid.
 */
const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required." });
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("JWT_SECRET environment variable is not set.");
    return res.status(500).json({ error: "Server configuration error." });
  }

  try {
    req.user = jwt.verify(token, secret);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

module.exports = { authenticateUser };
