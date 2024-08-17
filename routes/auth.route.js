import { Router } from 'express'

// controllers
import { login, logout, register } from '../controllers/auth.controller.js'
import {
  validateLogin,
  validateRegisterInput,
} from '../middleware/validation.middleware.js'

// router init
const router = Router()

// /api/v1/auth/register - POST register user
router.post('/register', validateRegisterInput, register)

// /api/v1/auth/login - POST login user
router.post('/login', validateLogin, login)

// /api/v1/auth/logout - GET logout user
router.get('/logout', logout)

export default router
