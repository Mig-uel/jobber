import User from '../models/user.model.js'
import Job from '../models/job.model.js'

/**
 * @desc GET STATS
 * @method GET
 * @path /api/v1/admin/stats
 */
export const getStats = async (req, res) => {
  return res.status(200).json({ message: 'you are admin!' })
}
