import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import httpStatus from 'http-status'
import { CHECK_FIELDS } from '../utils/globals'
import pick from '@app/utils/pick'
import { ValidationError } from '@app/errors/ValidationError'

export const validate =
  (schema: Record<string, any>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const validSchema = pick(schema, ['params', 'query', 'body'])
    const object = pick(req, Object.keys(validSchema))
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(object)

    if (error) {
      const errorMessage = CHECK_FIELDS
      if (error.isJoi) {
        const details = error.details.map((details) => {
          return {
            field: details.context.key,
            value: details.context.value,
            message: details.message,
          }
        })
        res
          .status(httpStatus.BAD_REQUEST)
          .json(
            new ValidationError(httpStatus.BAD_REQUEST, errorMessage, details)
          )
      } else {
        return next(error)
      }
    }
    Object.assign(req, value)
    return next()
  }
