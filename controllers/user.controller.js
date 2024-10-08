import User from '../models/user.model.js'
import Job from '../models/job.model.js'
import { formatImage } from '../middleware/multer.middleware.js'
import { v2 as cloudinary } from 'cloudinary'

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
export const updateUser = async (req, res) => {
  const { file } = req
  const { id } = req.user
  const { firstName, lastName, email, location, password } = req.body

  const user = await User.findById(id).select('-password')

  if (file) {
    const bufferFile = formatImage(file)

    // upload file to cloudinary
    const response = await cloudinary.uploader.upload(bufferFile)

    // remove old cloudinary avatar from cloudinary
    if (user.avatarPublicId) {
      await cloudinary.uploader.destroy(user.avatarPublicId, {
        invalidate: true,
      })
    }

    // update user avatar & avatar public ID
    user.avatar = response.secure_url
    user.avatarPublicId = response.public_id
  }

  if (!password) {
    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    user.location = location
  } else {
    user = await User.findById(id)

    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    user.location = location
    user.password = password
  }

  await user.save()

  return res.status(200).json({ message: 'User profile successfully updated' })
}
