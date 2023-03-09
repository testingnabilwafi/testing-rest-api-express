import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import type { Application, Request, Response, NextFunction } from 'express'

import './utils/connectDB'

import { routes } from './routes/index'
import { logger } from './utils/logger'
import deserializeToken from './middleware/deserializeToken'

const app: Application = express()
const PORT: number = 3000

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use((req: Request, res: Response, next: NextFunction): void => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

app.use(deserializeToken)

routes(app)

app.listen(process.env.PORT ?? PORT, () => {
  logger.info(`server listening on port ${PORT}`)
})
