import { Router } from 'express'
import { requireUser, requireAdmin } from '../middleware/auth'
import {
  deleteProduct,
  getProducts,
  getProductsById,
  storeProduct,
  updateProduct
} from '../controllers/products.controllers'

const productRouter: Router = Router()

productRouter.get('/', getProducts)
productRouter.get('/:id', getProductsById)
productRouter.post('/', requireUser, storeProduct)
productRouter.put('/:id', requireAdmin, updateProduct)
productRouter.delete('/:id', requireAdmin, deleteProduct)

export default productRouter
