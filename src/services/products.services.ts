import {
  deleteProductData,
  getProductData,
  getProductDataByID,
  storeProductData,
  updateProductData
} from '../repositories/product.repository'
import {
  createProductValidation,
  updateProductValidation
} from '../validation/product.validation'

import type { IProduct } from '../interfaces/Product.interface'
import { logger } from '../utils/logger'

export const getProductsService = async () => {
  try {
    const products = await getProductData()
    if (products === null) {
      return { status: 'not found', data: null }
    }

    return { status: 'success', data: products }
  } catch (error) {
    return { status: 'error', data: error }
  }
}

export const getProductDetailService = async (id: string) => {
  try {
    const product = await getProductDataByID(id)
    if (product === null) {
      return { status: 'not found', data: null }
    }

    return { status: 'success', data: product }
  } catch (error) {
    return { status: 'error', data: error }
  }
}

export const storeProductService = async (payload: IProduct) => {
  const { error, value } = createProductValidation(payload)
  if (error !== undefined) {
    logger.error('ERR: product - create = ', error.details[0].message)
    return { status: 'error', data: error.details[0].message }
  }

  try {
    await storeProductData(value)
    logger.info('successfully created product')
    return { status: 'success', data: 'successfully created product' }
  } catch (error) {
    logger.error('ERR: product - create = ', error)
    return { status: 'error', data: error }
  }
}

export const updateProductService = async (id: string, payload: IProduct) => {
  const { error, value } = updateProductValidation(payload)
  if (error !== undefined) {
    logger.error('ERR: product - create = ', error.details[0].message)
    return { status: 'error', data: error.details[0].message }
  }

  try {
    const product = await updateProductData(id, value)
    if (product === null) {
      logger.error('ERR: product - create = data not found')
      return { status: 'not found', data: null }
    }

    return { status: 'success', data: 'successfully updated product' }
  } catch (error) {
    logger.error('ERR: product - update = ', error)
    return { status: 'error', data: error }
  }
}

export const deleteProductService = async (id: string) => {
  try {
    const result = await deleteProductData(id)
    if (result === null) {
      logger.info('data not found')
      return { status: 'not found', data: null }
    }

    logger.info('successfully delete product')
    return { status: 'success', data: null }
  } catch (error) {
    logger.error('ERR: product - delete = ', error)
    return { status: 'error', data: error }
  }
}
