import Job from '../models/job.model.js'
import {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from '../utils/errors.utils.js'

/**
 * @desc GET ALL JOBS
 * @method GET
 * @path /api/v1/jobs
 * @access PUBLIC
 */
export const getJobs = async (req, res) => {
  const jobs = await Job.find({})
  return res.status(200).json(jobs)
}

/**
 * @desc GET SINGLE JOB
 * @method GET
 * @path /api/v1/jobs/:id
 * @access PUBLIC
 */
export const getJob = async (req, res) => {
  const { id } = req.params

  const job = await Job.findById(id)

  if (!job) {
    throw new NotFoundError(`No job found with ID '${id}'`)
  }

  return res.status(200).json(job)
}

/**
 * @desc UPDATE JOB
 * @method PATCH
 * @path /api/v1/jobs/:id
 * @access PRIVATE
 */
export const updateJob = async (req, res) => {
  const { id } = req.params
  const { company, position, location } = req.body

  const job = await Job.findById(id)
  if (!job)
    return res.status(404).json({ message: `No job found with ID '${id}'` })

  // job.company = company || job.company
  // job.position = position || job.position
  // job.location = location || job.location

  job.set(req.body)

  await job.save()

  return res.status(200).json({ message: 'Job modified', job })
}

/**
 * @desc CREATE JOB
 * @method POST
 * @path /api/v1/jobs
 * @access PRIVATE
 */
export const createJob = async (req, res) => {
  const { company, position, location } = req.body

  if ((!company || !position, !location))
    throw new Error('Please provide all fields')

  const job = await Job.create({ company, position, location })

  return res.status(201).json(job)
}

/**
 * @desc DELETE JOB
 * @method DELETE
 * @path /api/v1/jobs/:id
 * @access PRIVATE
 */
export const deleteJob = async (req, res) => {
  const { id } = req.params

  const job = await Job.findById(id)

  if (!job) {
    const error = new Error(`No job found with ID '${id}'`)
    error.status = 404
    throw error
  }

  await job.deleteOne()

  return res.status(200).json({ message: 'Job deleted' })
}
