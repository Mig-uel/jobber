import User from '../models/user.model.js'
import { UnauthenticatedError } from '../utils/errors.utils.js'

/**
 * @desc REGISTER
 * @method POST
 * @path /api/v1/auth/register
 * @access PUBLIC
 */
export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  await User.create({
    firstName,
    lastName,
    email,
    password,
  })

  return res.status(201).json({ message: 'User created' })
}

/**
 * @desc LOGIN
 * @method POST
 * @path /api/v1/auth/login
 * @access PUBLIC
 */
export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) throw new UnauthenticatedError('Invalid email/password')

  const isPasswordCorrect = await user.isPasswordCorrect(password)
  if (!isPasswordCorrect)
    throw new UnauthenticatedError('Invalid email/password')

  return res.status(200).json(user)
}
