import day from 'dayjs'
import mongoose from 'mongoose'
import Job from '../models/job.model.js'
import { ROLE } from '../utils/constants.utils.js'
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
  const {
    query: { search, status, type, sort },
  } = req
  const { id, role } = req.user

  const queryObject = {
    user: id,
  }

  // search query
  if (search)
    queryObject.$or = [
      { position: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ]

  // status query
  if (status && status !== 'all') queryObject.status = status

  // type query
  if (type && type !== 'all') queryObject.type = type

  // sort options
  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'position',
    'z-a': '-position',
  }
  const sortKey = sortOptions[sort] || sortOptions.newest

  // pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  const jobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit)

  const totalJobs = await Job.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalJobs / limit)
  const currentPage = page

  return res.status(200).json({ totalJobs, numOfPages, currentPage, jobs })
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
  const { id } = req.user
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

/**
 * @desc GET JOB STATS
 * @method GET
 * @path /api/v1/jobs/stats
 * @access PRIVATE
 */
export const getJobStats = async (req, res) => {
  const { id } = req.user

  // mongodb/mongoose aggregation pipeline for job statuses
  let stats = await Job.aggregate([
    // stage 1
    {
      $match: {
        user: new mongoose.Types.ObjectId(id),
      },
    },
    // stage 2
    {
      $group: { _id: '$status', count: { $sum: 1 } },
    },
  ])

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr

    acc[title] = count
    return acc
  }, {})

  // mongodb/mongoose aggregation pipeline for monthly applications
  let monthlyApplications = await Job.aggregate([
    // stage 1
    {
      $match: { user: new mongoose.Types.ObjectId(id) },
    },
    // stage 2
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    // stage 3
    {
      $sort: { '_id.year': -1, '_id.month': -1 },
    },
    // stage 4
    {
      $limit: 6,
    },
  ])

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item

      const date = day()
        .month(month - 1)
        .year(year)
        .format('MMM YY')

      return { date, count }
    })
    .reverse()

  return res.status(200).json({
    stats: {
      pending: stats.pending || 0,
      declined: stats.declined || 0,
      interview: stats.interview || 0,
    },
    monthlyApplications,
  })
}
