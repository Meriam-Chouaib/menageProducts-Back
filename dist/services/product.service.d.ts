import { Product } from '@prisma/client'
import { GetProductsParams } from '@app/type/product.type'
declare const createProduct: (data: Product) => Promise<{
  name: string
  id: number
  price: number
  quantity: number
  description: string
  userId: number
  category: string
  createdAt: Date
  updatedAt: Date
}>
declare const getProducts: (filterFields: GetProductsParams) => Promise<{
  products: {
    name: string
    id: number
    price: number
    quantity: number
    description: string
    userId: number
    category: string
    createdAt: Date
    updatedAt: Date
  }[]
  nbPages: number
  currentPage: number
}>
declare const getProductsByKeyword: (keyword: string) => Promise<Product[]>
declare const updateProduct: (data: Product, id: number) => Promise<Product>
declare const deleteProduct: (id: number) => Promise<Product>
declare const getProductById: (id: number) => Promise<Product>
export {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductsByKeyword,
}
