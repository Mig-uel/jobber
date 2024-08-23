import { Router } from 'express'
import { upload } from '../middleware/multer.middleware.js'

// validation
import { validateUpdateUserInput } from '../middleware/validation.middleware.js'

// controllers
import { getUser, updateUser } from '../controllers/user.controller.js'
import { isDemoUser } from '../middleware/auth.middleware.js'

// router init
const router = Router()

// /api/v1/users - GET current user | patch update user
router
  .route('/')
  .get(getUser)
  .patch(
    isDemoUser,
    upload.single('avatar'),
    validateUpdateUserInput,
    updateUser
  )

export default router
