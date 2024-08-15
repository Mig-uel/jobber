import { Router } from 'express'
import { nanoid } from 'nanoid'

let jobs = [
  { id: nanoid(10), company: 'Apple', position: 'Front-End' },
  { id: nanoid(10), company: 'Google', position: 'Back-End' },
]

// router obj
const router = Router()

// GET /api/v1/jobs - all jobs
router.get('/', (req, res) => {
  return res.status(200).json(jobs)
})

// GET /api/v1/jobs/:id - single job
router.get('/:id', (req, res) => {
  const { id } = req.params

  const job = jobs.find((j) => j.id === id)

  if (!job)
    return res.status(404).json({ message: `No job found with ID '${id}'` })

  return res.status(200).json(job)
})

// PATCH /api/v1/jobs/:id - edit job
router.patch('/:id', (req, res) => {
  const { id } = req.params
  const { company, position } = req.body

  const job = jobs.find((j) => j.id === id)
  if (!job)
    return res.status(404).json({ message: `No job found with ID '${id}'` })

  job.company = company || job.company
  job.position = position || job.position

  return res.status(200).json(job)
})

// POST /api/v1/jobs - add job
router.post('/', (req, res) => {
  const { company, position } = req.body

  if (!company || !position)
    return res.status(400).json({ message: 'Please provide all fields' })

  const job = { id: nanoid(10), company, position }
  jobs.push(job)

  return res.status(201).json(job)
})

// DELETE /api/v1/jobs/:id - delete job
router.delete('/:id', (req, res) => {
  const { id } = req.params

  jobs = jobs.filter((job) => job.id !== id)

  return res.status(200).json(jobs)
})

export default router
