import { verifyJWT } from '../utils/jwt'

import type { Request, Response, NextFunction } from 'express'

const deserializeToken = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers?.authorization?.replace(/^Bearer\s/, '')
  if (!accessToken) {
    return next()
  }

  const token: any = verifyJWT(accessToken)
  if (!token.decoded) {
    return next()
  }

  if (token.expired) {
    return next()
  }

  res.locals.user = token.decoded
  return next()
}

export default deserializeToken
