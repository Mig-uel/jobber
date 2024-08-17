import { UnauthenticatedError } from '../utils/errors.utils.js'

export const isAuth = async (req, res, next) => {
  const { token } = req.cookies

  if (!token) throw new UnauthenticatedError('Not authenticated')

  next()
}
