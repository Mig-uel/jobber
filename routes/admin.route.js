import { Router } from 'express'

// controllers
import { getStats } from '../controllers/admin.controller.js'

// router init
const router = Router()

// GET - /api/v1/admin/stats
router.get('/stats', getStats)

export default router
