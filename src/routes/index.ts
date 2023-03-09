import healthRouter from './health.routes'
import productRouter from './product.routes'
import authRouter from './auth.routes'

import type { Application, Router } from 'express'

const _routes: Array<[string, Router]> = [
  ['/healths', healthRouter],
  ['/products', productRouter],
  ['/auth', authRouter]
]

const routes = (app: Application): void => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}

export { routes }
