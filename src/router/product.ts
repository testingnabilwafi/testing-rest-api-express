import { Router } from 'express'

import type { Request, Response } from 'express'

const productRouter: Router = Router()

productRouter.get('/', (req: Request, res: Response): void => {
  res.status(200).send({
    status: true,
    statusCode: 200,
    data: { name: 'Sepatu Roda', price: 500000 }
  })
})

export default productRouter
