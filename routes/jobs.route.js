import { Router } from 'express'
import { nanoid } from 'nanoid'

let jobs = [
  { id: nanoid(10), company: 'Apple', position: 'Front-End' },
  { id: nanoid(10), company: 'Google', position: 'Back-End' },
]

// router obj
const router = Router()

// GET /api/v1/jobs
router.get('/', (req, res) => {
  return res.status(200).json(jobs)
})

// POST /api/v1/jobs
router.post('/', (req, res) => {
  const { company, position } = req.body

  if (!company || !position)
    return res.status(400).json({ message: 'Please provide all fields' })

  const job = { id: nanoid(10), company, position }
  jobs.push(job)

  return res.status(200).json(job)
})

export default router
