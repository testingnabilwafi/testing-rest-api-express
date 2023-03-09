import mongoose from 'mongoose'

import CONFIG from '../config/env'
import { logger } from './logger'

mongoose
  .connect(`${CONFIG.DB}`)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((err) => {
    logger.info('Could not connect to MongoDB')
    logger.error(err)
  })
