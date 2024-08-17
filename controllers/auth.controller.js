import User from '../models/user.model.js'

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
  return res.status(200).json({ message: 'hello' })
}
