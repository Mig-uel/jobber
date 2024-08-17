import User from '../models/user.model.js'
import Job from '../models/job.model.js'

/**
 * @desc GET USERS PROFILE
 * @method GET
 * @path /api/v1/users
 * @access PRIVATE
 */
export const getUser = async (req, res) => {
  const { id } = req.user

  const user = await User.findById(id).select('-password')

  return res.status(200).json({ user })
}

/**
 * @desc UPDATE USERS PROFILE
 * @method PATCH
 * @path /api/v1/users
 * @access PRIVATE
 */
export const updateUser = async (req, res) => {}
