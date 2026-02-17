const express = require("express");
const dotenv = require("dotenv");
const logger = require("./config/logger");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));

app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
