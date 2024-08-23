import { Router } from 'express'

// validator
import {
  validateIdParam,
  validateJobInput,
} from '../middleware/validation.middleware.js'

// controllers
import {
  getJobs,
  getJob,
  updateJob,
  createJob,
  deleteJob,
} from '../controllers/jobs.controller.js'
import { isDemoUser } from '../middleware/auth.middleware.js'

// router obj
const router = Router()

// /api/v1/jobs - GET get all jobs | POST create job
router.route('/').get(getJobs).post(isDemoUser, validateJobInput, createJob)

// /api/v1/jobs/:id - GET get single job | PATCH update job | DELETE remove job
router
  .route('/:id')
  .get(validateIdParam, getJob)
  .patch(isDemoUser, validateIdParam, validateJobInput, updateJob)
  .delete(isDemoUser, validateIdParam, deleteJob)

export default router
