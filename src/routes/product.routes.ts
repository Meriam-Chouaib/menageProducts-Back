import { Endpoints } from '@app/config/endpoints'
import { ProductController } from '@app/controllers'
import { authenticate } from '@app/middlewares/authenticate.middleware'
import { uploadMultiple } from '@app/middlewares/upload.middleware'
import express from 'express'

const productRouter = express.Router()

// get, create , patch '/products' getbyId ( /products/:id)
productRouter.post(
  Endpoints.ROOT,
  authenticate,
  uploadMultiple,
  ProductController.createProduct
)
productRouter.get(Endpoints.ROOT, ProductController.getProducts)
productRouter.put(
  Endpoints.ROOT,
  uploadMultiple,
  ProductController.updateProduct
)
productRouter.delete(
  Endpoints.ROOT,
  authenticate,
  ProductController.deleteProduct
)
// productRouter.get(Endpoints.product.SINGLE, ProductController.getProductById)
productRouter.get(
  Endpoints.product.SEARCH,
  ProductController.getProductsByKeyword
)
export default productRouter
