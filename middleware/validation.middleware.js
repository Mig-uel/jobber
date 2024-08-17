import { body, validationResult } from 'express-validator'
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
