import { UnauthenticatedError } from '../utils/errors.utils.js'
import { verifyToken } from '../utils/jwt.utils.js'

export const isAuth = async (req, res, next) => {
  const { token } = req.cookies

  if (!token) throw new UnauthenticatedError('Not authenticated')

  next()
}

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies

  try {
    const { id, role } = verifyToken(token)

    req.user = { id, role }

    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication failed')
  }
}
