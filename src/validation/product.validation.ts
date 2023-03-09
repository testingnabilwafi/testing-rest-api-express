import Joi from 'joi'

import type { ValidationResult } from 'joi'
import type { IProduct } from '../interfaces/Product.interface'

export const createProductValidation = (
  payload: IProduct
): ValidationResult => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().allow('', null)
  })

  return schema.validate(payload)
}

export const updateProductValidation = (
  payload: IProduct
): ValidationResult => {
  const schema = Joi.object({
    name: Joi.string().allow('', null),
    price: Joi.number().allow('', null)
  })

  return schema.validate(payload)
}
