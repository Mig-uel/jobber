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

// GET /api/v1/jobs - all jobs
router.get('/', getJobs)

// GET /api/v1/jobs/:id - single job
router.get('/:id', getJob)

// PATCH /api/v1/jobs/:id - edit job
router.patch('/:id', editJob)

// POST /api/v1/jobs - add job
router.post('/', addJob)

// DELETE /api/v1/jobs/:id - delete job
router.delete('/:id', deleteJob)

export default router
