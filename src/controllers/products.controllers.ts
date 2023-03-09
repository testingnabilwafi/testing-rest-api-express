import type { Request, RequestHandler, Response } from 'express'
import { logger } from '../utils/logger'
import {
  deleteProductService,
  getProductDetailService,
  getProductsService,
  storeProductService,
  updateProductService
} from '../services/products.services'

export const getProducts = (async (req: Request, res: Response) => {
  const { status, data } = await getProductsService()
  if (status === 'error') {
    return res.status(500).send({
      status: false,
      statusCode: 500,
      message: data,
      data: []
    })
  }

  if (status === 'not found') {
    return res.status(404).send({
      status: false,
      statusCode: 404,
      message: 'products not found',
      data: []
    })
  }

  res.status(200).send({
    status: true,
    statusCode: 200,
    message: 'success',
    data
  })
}) as RequestHandler

export const getProductsById = (async (req: Request, res: Response) => {
  const { id } = req.params

  const { status, data } = await getProductDetailService(id)
  if (status === 'error') {
    return res.status(500).send({
      status: false,
      statusCode: 500,
      message: data,
      data: []
    })
  }

  if (status === 'not found') {
    return res.status(404).send({
      status: false,
      statusCode: 404,
      message: 'product not found',
      data: []
    })
  }

  return res.status(200).send({
    status: true,
    statusCode: 200,
    message: 'success',
    data
  })
}) as RequestHandler

export const storeProduct = (async (req: Request, res: Response) => {
  const { status, data } = await storeProductService(req.body)
  if (status === 'error') {
    logger.error('ERR: product - create = ', data)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: data
    })
  }

  logger.info('successfully created product')
  res.status(201).send({
    status: true,
    statusCode: 201,
    message: 'successfully created data'
  })
}) as RequestHandler

export const updateProduct = (async (req: Request, res: Response) => {
  const { id } = req.params

  const { status, data } = await updateProductService(id, req.body)
  if (status === 'error') {
    logger.error('ERR: product - update = ', data)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: data
    })
  }

  if (status === 'not found') {
    logger.error(`ERR: product - update = ${status}`)
    return res.status(404).send({
      status: false,
      statusCode: 404,
      message: data
    })
  }

  logger.info('successfully update product')
  res.status(200).send({
    status: true,
    statusCode: 200,
    message: 'successfully updated data'
  })
}) as RequestHandler

export const deleteProduct = (async (req: Request, res: Response) => {
  const { id } = req.params

  const { status, data } = await deleteProductService(id)
  if (status === 'error') {
    logger.error('ERR: product - update = ', data)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: data
    })
  }

  if (status === 'not found') {
    logger.error(`ERR: product - deleted = ${status}`)
    return res.status(404).send({
      status: false,
      statusCode: 404,
      message: data
    })
  }

  logger.info('successfully deleted product')
  res.status(200).send({
    status: true,
    statusCode: 200,
    message: 'successfully deleted data'
  })
}) as RequestHandler
