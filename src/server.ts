import express from 'express'

import type { Application } from 'express'

import { routes } from './router'

const app: Application = express()
const PORT: number = 3000

routes(app)

app.listen(process.env.PORT ?? PORT, () => {
  console.log(`server listening on port ${PORT}`)
})
