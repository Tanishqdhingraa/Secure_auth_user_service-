import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validate } from '../middlewares/validate.middleware'
import logger from '../config/logger.js'



