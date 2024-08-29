import { Router } from 'express'
import rateLimit from 'express-rate-limit'

// controllers
import { login, logout, register } from '../controllers/auth.controller.js'
import {
  validateLogin,
  validateRegisterInput,
} from '../middleware/validation.middleware.js'

// router init
const router = Router()

// api limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 15,
  message: { message: 'IP rate limit exceeded, retry in 15 minutes' },
})

// /api/v1/auth/register - POST register user
router.post('/register', apiLimiter, validateRegisterInput, register)

// /api/v1/auth/login - POST login user
router.post('/login', apiLimiter, validateLogin, login)

// /api/v1/auth/logout - GET logout user
router.get('/logout', logout)

export default router
