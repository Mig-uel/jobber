import e, { Router } from 'express'

// controllers
import {
  getJobs,
  getJob,
  editJob,
  addJob,
  deleteJob,
} from '../controllers/jobs.controller.js'

// router obj
const router = Router()

// /api/v1/jobs - GET get all jobs | POST add job
router.route('/').get(getJobs).post(addJob)

// /api/v1/jobs/:id - GET get single job | PATCH edit job | DELETE remove job
router.route('/:id').get(getJob).patch(editJob).delete(deleteJob)

export default router
