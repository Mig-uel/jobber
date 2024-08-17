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
 * @access PRIVATE
 */
export const getJobs = async (req, res) => {
  const jobs = await Job.find({})
  return res.status(200).json(jobs)
}

/**
 * @desc GET SINGLE JOB
 * @method GET
 * @path /api/v1/jobs/:id
 * @access PRIVATE
 */
export const getJob = async (req, res) => {
  const { job } = req

  return res.status(200).json(job)
}

/**
 * @desc UPDATE JOB
 * @method PATCH
 * @path /api/v1/jobs/:id
 * @access PRIVATE
 */
export const updateJob = async (req, res) => {
  const { job } = req
  // const { company, position, location } = req.body

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
  const { id } = req
  const { company, position, location, type } = req.body

  const job = await Job.create({ company, position, type, location, user: id })

  return res.status(201).json(job)
}

/**
 * @desc DELETE JOB
 * @method DELETE
 * @path /api/v1/jobs/:id
 * @access PRIVATE
 */
export const deleteJob = async (req, res) => {
  const { job } = req

  await job.deleteOne()

  return res.status(200).json({ message: 'Job deleted' })
}
