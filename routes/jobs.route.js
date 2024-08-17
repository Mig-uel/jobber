import { Router } from 'express'

// validator
import { validateJobInput } from '../middleware/validation.middleware.js'

// controllers
import {
  getJobs,
  getJob,
  updateJob,
  createJob,
  deleteJob,
} from '../controllers/jobs.controller.js'

// router obj
const router = Router()

// /api/v1/jobs - GET get all jobs | POST create job
router.route('/').get(getJobs).post(validateJobInput, createJob)

// /api/v1/jobs/:id - GET get single job | PATCH update job | DELETE remove job
router
  .route('/:id')
  .get(getJob)
  .patch(validateJobInput, updateJob)
  .delete(deleteJob)

export default router
