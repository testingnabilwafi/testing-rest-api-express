import { Router } from 'express'

import type { Request, Response } from 'express'

const healthRouter = Router()

healthRouter.get('/', (req: Request, res: Response): void => {
  res.status(200).send({ data: 'Hello World' })
})

export default healthRouter
