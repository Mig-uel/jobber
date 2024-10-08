import mongoose from 'mongoose'
import Job from '../models/job.model.js'
import User from '../models/user.model.js'
import { body, param, validationResult } from 'express-validator'
import {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from '../utils/errors.utils.js'
import { ROLE, STATUS, TYPE } from '../utils/constants.utils.js'

const withValidationErrors = (validateValues) => {
  return [
    validateValues,

    (req, res, next) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        const errorsMessages = errors.array().map((error) => error.msg)

        if (errorsMessages[0].startsWith('No job'))
          throw new NotFoundError(errorsMessages)

        if (errorsMessages[0].startsWith('Unauthorized'))
          throw new UnauthorizedError(errorsMessages)

        throw new BadRequestError(errorsMessages)
      }

      next()
    },
  ]
}

/**
 * @desc VALIDATES JOB INPUT
 */
export const validateJobInput = withValidationErrors([
  body('company').trim().notEmpty().withMessage('Company is required'),
  body('position').trim().notEmpty().withMessage('Position is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('status')
    .isIn(Object.values(STATUS))
    .withMessage('Invalid status value'),
  body('type').isIn(Object.values(TYPE)).withMessage('Invalid type value'),
])

/**
 * @desc VALIDATES ID PARAM
 */
export const validateIdParam = withValidationErrors([
  param('id').custom(async (id, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(id)
    if (!isValidId) throw new Error('Invalid MongoDB ID')

    const job = await Job.findById(id)
    if (!job) throw new Error(`No job found with ID '${id}'`)

    // GET USER ID AND ROLE FROM REQUEST
    const { id: userId, role } = req.user

    // BOOLEAN VALUES
    const isAdmin = role === ROLE.ADMIN
    const isOwner = userId === job.user.toString()

    // CHECK IF USER IS ADMIN OR OWNER OF THE JOB
    if (!isAdmin && !isOwner)
      throw new Error('Unauthorized to access this route')

    req.job = job

    return true
  }),
])

/**
 * @desc VALIDATES REGISTER INPUT
 */
export const validateRegisterInput = withValidationErrors([
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email')
    .trim()
    .normalizeEmail({ all_lowercase: true })
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email) => {
      const emailExists = await User.findOne({ email })

      if (emailExists) throw new Error('Email already exists')

      return true
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
])

/**
 * @desc VALIDATE LOGIN INPUT
 */
export const validateLogin = withValidationErrors([
  body('email')
    .trim()
    .normalizeEmail({ all_lowercase: true })
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
])

/**
 * @desc VALIDATE UPDATE USER INPUT
 */
export const validateUpdateUserInput = withValidationErrors([
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .normalizeEmail()
    .custom(async (email, { req }) => {
      const { id } = req.user
      const user = await User.findOne({ email })

      // CHECK IF CURRENT USER IS OWNER OF THE FOUND USERS EMAIL
      if (user && user._id.toString() !== id)
        throw new Error('Email already exists')

      return true
    }),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .optional({ values: 'falsy' }),
  body('confirmPassword').custom((confirmPassword, { req }) => {
    const { password } = req.body

    if (!password) return true
    if (password && password !== confirmPassword)
      throw new Error('Password confirmation must match')

    return true
  }),
  body('location').notEmpty().withMessage('Location is required'),
])
