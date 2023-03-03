import healthRouter from './health'

import type { Application, Router } from 'express'
import productRouter from './product'

const _routes: Array<[string, Router]> = [
  ['/healths', healthRouter],
  ['/products', productRouter]
]

const routes = (app: Application): void => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}

export { routes }
