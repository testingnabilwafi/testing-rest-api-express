import {
  createUserService,
  loginUserService,
  refreshTokenService
} from '../services/auth.services'
import { logger } from '../utils/logger'

import type { Response, Request, RequestHandler } from 'express'

export const createUser = (async (req: Request, res: Response) => {
  const { status, data } = await createUserService(req.body)
  if (status === 'error') {
    logger.error('ERR: product - create = ', data)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: data
    })
  }

  logger.info('successfully created user')
  res.status(201).send({
    status: true,
    statusCode: 201,
    message: 'successfully created user'
  })
}) as RequestHandler

export const loginUser = (async (req: Request, res: Response) => {
  const { status, data } = await loginUserService(req.body)
  if (status === 'error') {
    if (data === 'invalid email' || data === 'invalid password') {
      logger.error('ERR: product - login = ', data)
      return res.status(401).send({
        status: false,
        statusCode: 401,
        message: data
      })
    }
    logger.error('ERR: product - login = ', data)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: data
    })
  }

  logger.info('successfully login user')
  res.status(200).send({
    status: true,
    statusCode: 200,
    message: 'successfully login user',
    data
  })
}) as RequestHandler

export const refreshToken = (async (req: Request, res: Response) => {
  const { status, data } = await refreshTokenService(req.body.refreshToken)
  if (status === 'error') {
    if (data === 'invalid email') {
      logger.error('ERR: product - refresh = ', data)
      return res.status(401).send({
        status: false,
        statusCode: 401,
        message: data
      })
    }
    logger.error('ERR: product - refresh = ', data)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: data
    })
  }

  logger.info('successfully refresh user')
  res.status(200).send({
    status: true,
    statusCode: 200,
    message: 'successfully refresh user',
    data
  })
}) as RequestHandler
