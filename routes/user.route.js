import { Router } from 'express'

// validation
import { validateUpdateUserInput } from '../middleware/validation.middleware.js'

// controllers
import { getUser, updateUser } from '../controllers/user.controller.js'

// router init
const router = Router()

// /api/v1/users - GET current user | patch update user
router.route('/').get(getUser).patch(validateUpdateUserInput, updateUser)

export default router
