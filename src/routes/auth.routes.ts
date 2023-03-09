import { Router } from 'express'

import {
  createUser,
  loginUser,
  refreshToken
} from '../controllers/auth.controllers'

const authRouter = Router()

authRouter.post('/register', createUser)
authRouter.post('/login', loginUser)
authRouter.post('/refresh-token', refreshToken)

export default authRouter
