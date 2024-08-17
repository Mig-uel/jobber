import { Router } from 'express'

// controllers
import { login, register } from '../controllers/auth.controller.js'

// router init
const router = Router()

router.post('/register', register)
router.post('/login', login)

export default router
