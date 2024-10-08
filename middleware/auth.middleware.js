import { ROLE } from '../utils/constants.utils.js'
import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from '../utils/errors.utils.js'
import { verifyToken } from '../utils/jwt.utils.js'

export const isAuth = (req, res, next) => {
  const { token } = req.cookies

  if (!token) throw new UnauthenticatedError('Not authenticated')

  return next()
}

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies

  try {
    const { id, role } = verifyToken(token)

    req.user = { id, role }

    return next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication failed')
  }
}

export const isAdmin = (req, res, next) => {
  const { role } = req.user

  if (role !== ROLE.ADMIN)
    throw new UnauthorizedError('Unauthorized to access this route')

  return next()
}

export const isDemoUser = (req, res, next) => {
  const { role } = req.user

  if (role === 'demo')
    throw new BadRequestError('Demo does not support this action')

  return next()
}
