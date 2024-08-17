import { Router } from 'express'

// controllers
import { login, register } from '../controllers/auth.controller.js'
import { validateRegisterInput } from '../middleware/validation.middleware.js'

// router init
const router = Router()

router.post('/register', validateRegisterInput, register)
router.post('/login', login)

export default router
