const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validate = require("../middlewares/validate.middleware");
const { registerSchema } = require("../schemas/auth.schema");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");
const authenticate = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");
const logger = require("../config/logger");

const router = express.Router();

// In-memory DB (replace with real DB)
let users = [];
let refreshTokens = [];

// REGISTER
router.post("/register", validate(registerSchema), async (req, res) => {
  const { email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = { id: Date.now(), email, password: hashedPassword, role };

  users.push(user);

  logger.info("User registered", { email });

  res.json({ message: "User registered successfully" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Invalid credentials" });

  const payload = { id: user.id, role: user.role };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  refreshTokens.push(refreshToken);

  logger.info("User logged in", { email });

  res.json({ accessToken, refreshToken });
});

// REFRESH TOKEN
router.post("/refresh", (req, res) => {
  const { token } = req.body;

  if (!token) return res.status(401).json({ message: "No refresh token" });
  if (!refreshTokens.includes(token))
    return res.status(403).json({ message: "Invalid refresh token" });

  jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    const accessToken = generateAccessToken({
      id: user.id,
      role: user.role,
    });

    res.json({ accessToken });
  });
});

// PROTECTED ROUTE
router.get("/profile", authenticate, (req, res) => {
  res.json({ message: "Protected route", user: req.user });
});

// // ADMIN ONLY ROUTE
// router.get(
//   "/admin",
//   authenticate,              // ✅ no ()
//   authorizeRoles("ADMIN"),   // this one is correct because it RETURNS a middleware
//   (req, res) => {
//     res.json({ message: "Admin route accessed" });
//   }
// );


module.exports = router;
