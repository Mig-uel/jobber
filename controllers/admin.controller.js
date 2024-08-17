import User from '../models/user.model.js'
import Job from '../models/job.model.js'

/**
 * @desc GET STATS
 * @method GET
 * @path /api/v1/admin/stats
 */
export const getStats = async (req, res) => {
  const usersCount = await User.estimatedDocumentCount()
  const jobsCount = await Job.estimatedDocumentCount()

  return res.status(200).json({ users: usersCount, jobs: jobsCount })
}
