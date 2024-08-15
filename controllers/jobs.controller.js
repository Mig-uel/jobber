import { nanoid } from 'nanoid'

let jobs = [
  { id: nanoid(10), company: 'Apple', position: 'Front-End' },
  { id: nanoid(10), company: 'Google', position: 'Back-End' },
]

/**
 * @desc GET ALL JOBS
 * @method GET
 * @path /api/v1/jobs
 * @access PUBLIC
 */
export const getJobs = (req, res) => {
  return res.status(200).json(jobs)
}

/**
 * @desc GET SINGLE JOB
 * @method GET
 * @path /api/v1/jobs/:id
 * @access PUBLIC
 */
export const getJob = (req, res) => {
  const { id } = req.params

  const job = jobs.find((j) => j.id === id)

  if (!job)
    return res.status(404).json({ message: `No job found with ID '${id}'` })

  return res.status(200).json(job)
}

/**
 * @desc EDIT JOB
 * @method PATCH
 * @path /api/v1/jobs/:id
 * @access PRIVATE
 */
export const editJob = (req, res) => {
  const { id } = req.params
  const { company, position } = req.body

  const job = jobs.find((j) => j.id === id)
  if (!job)
    return res.status(404).json({ message: `No job found with ID '${id}'` })

  job.company = company || job.company
  job.position = position || job.position

  return res.status(200).json(job)
}

/**
 * @desc ADD JOB
 * @method POST
 * @path /api/v1/jobs
 * @access PRIVATE
 */
export const addJob = (req, res) => {
  const { company, position } = req.body

  if (!company || !position) throw new Error('Please provide all fields')

  const job = { id: nanoid(10), company, position }
  jobs.push(job)

  return res.status(201).json(job)
}

/**
 * @desc DELETE JOB
 * @method DELETE
 * @path /api/v1/jobs/:id
 * @access PRIVATE
 */
export const deleteJob = (req, res) => {
  const { id } = req.params

  jobs = jobs.filter((job) => job.id !== id)

  return res.status(200).json(jobs)
}
