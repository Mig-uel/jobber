import { Router } from 'express'

// controllers
import { login, register } from '../controllers/auth.controller'

// router init
const router = Router()

router.post('/register', register)
router.post('/login', login)

export default router
