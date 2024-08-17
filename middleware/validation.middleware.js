import mongoose from 'mongoose'
import Job from '../models/job.model.js'
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

export const validateJobInput = withValidationErrors([
  body('company').trim().notEmpty().withMessage('Company is required'),
  body('position').trim().notEmpty().withMessage('Position is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('status')
    .isIn(Object.values(STATUS))
    .withMessage('Invalid status value'),
  body('type').isIn(Object.values(TYPE)).withMessage('Invalid type value'),
])

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value)

    if (!isValidId) throw new BadRequestError('Invalid MongoDB ID')

    const job = await Job.findById(value)

    if (!job) throw new Error(`No job found with ID '${value}'`)

    req.job = job

    return true
  }),
])
