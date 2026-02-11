import express from 'express'
import dotenv from 'dotenv'
import logger from './config/logger.js'

// import  AuthenticatedRoutes from './'
dotenv.config();

const app = express();

app.use(express.json());

// app.use('api/auth',AuthenticatedRoutes)

app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;