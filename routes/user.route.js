import { Router } from 'express'

// controllers
import { getUser, updateUser } from '../controllers/user.controller.js'

// router init
const router = Router()

// /api/v1/users - GET current user | patch update user
router.route('/').get(getUser).patch(updateUser)

export default router
