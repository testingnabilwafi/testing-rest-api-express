import Joi from 'joi'

import type { IUser } from '../interfaces/user.inteface'
import type { ValidationResult } from 'joi'

export const createUserValidation = (payload: IUser): ValidationResult => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required().min(6),
    role: Joi.string().allow('', null)
  })

  return schema.validate(payload)
}

export const loginUserValidation = (payload: IUser): ValidationResult => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })

  return schema.validate(payload)
}

export const refreshTokenValidation = (
  refreshToken: string
): ValidationResult => {
  const schema = Joi.object({
    refreshToken: Joi.string().required()
  })

  return schema.validate({ refreshToken })
}
