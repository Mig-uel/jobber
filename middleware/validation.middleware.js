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
import { STATUS, TYPE } from '../utils/constants.utils.js'

const withValidationErrors = (validateValues) => {
  return [
    validateValues,

    (req, res, next) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        const errorsMessages = errors.array().map((error) => error.msg)

        if (errorsMessages[0].startsWith('No job')) {
          throw new NotFoundError(errorsMessages)
        }

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
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
])
