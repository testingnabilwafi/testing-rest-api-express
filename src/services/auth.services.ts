import { createUser, findUserByEmail } from '../repositories/user.repository'
import {
  createUserValidation,
  loginUserValidation,
  refreshTokenValidation
} from '../validation/auth.validation'
import { logger } from '../utils/logger'

import type { IUser } from '../interfaces/user.inteface'
import { hashing, verifyPassword } from '../utils/hashing'
import { signJWT, verifyJWT } from '../utils/jwt'

export const createUserService = async (payload: IUser) => {
  const { error, value } = createUserValidation(payload)
  if (error !== undefined) {
    logger.error('ERR: user - create = ', error.details[0].message)
    return { status: 'error', data: error.details[0].message }
  }

  try {
    const hashPassword = hashing(value.password)

    value.password = hashPassword

    await createUser(value)
    logger.info('successfully created product')
    return { status: 'success', data: 'successfully created user' }
  } catch (error) {
    logger.error('ERR: product - create = ', error)
    return { status: 'error', data: error }
  }
}

export const loginUserService = async (payload: IUser) => {
  const { error, value } = loginUserValidation(payload)
  if (error !== undefined) {
    return { status: 'error', data: error.details[0].message }
  }

  try {
    const user: any = await findUserByEmail(value.email)
    if (!user) return { status: 'error', data: 'invalid email' }

    const isValid = verifyPassword(value.password, user.password)
    if (!isValid) return { status: 'error', data: 'invalid password' }

    const accessToken = signJWT({ ...user }, { expiresIn: '5s' })

    const refreshToken = signJWT({ ...user }, { expiresIn: '1y' })

    return { status: 'success', data: { accessToken, refreshToken } }
  } catch (error) {
    logger.error(`ERR: product - login = ${error}`)
    return { status: 'error', data: error }
  }
}

export const refreshTokenService = async (refreshToken: string) => {
  const { error, value } = refreshTokenValidation(refreshToken)
  if (error !== undefined) {
    return { status: 'error', data: error.details[0].message }
  }

  try {
    const { decoded }: any = verifyJWT(value.refreshToken)
    if (!decoded) {
      logger.error('ERR: product - refresh = No User')
      return { status: 'error', data: 'no user' }
    }

    const user = await findUserByEmail(decoded._doc.email)
    if (!user) return { status: 'error', data: 'invalid email' }

    const accessToken = signJWT({ ...user }, { expiresIn: '1d' })

    return { status: 'success', data: { accessToken } }
  } catch (error) {
    logger.error(`ERR: product - login = ${error}`)
    return { status: 'error', data: error }
  }
}
