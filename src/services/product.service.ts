import { Product } from '@prisma/client'
import * as productQueries from '../queries/product.queries'
import { GetProductsParams } from '@app/type/product.type'

const createProduct = async (data: Product) => {
  try {
    const product = await productQueries.createProduct(data)
    console.log('🚀 ~ createProduct ~ product:', product)
    return product
  } catch (e) {
    console.log(e)
  }
}
const getProducts = async (filterFields: GetProductsParams) => {
  try {
    const { page, rowsPerPage } = filterFields

    const { products, totalCount } = await productQueries.getProducts(
      page,
      rowsPerPage
    )

    return {
      products,
      nbPages: Math.ceil(totalCount / rowsPerPage),

      currentPage: Number(page),
    }
  } catch (e) {
    console.log(e)
  }
}
const getProductsByKeyword = async (keyword: string): Promise<Product[]> => {
  try {
    const products = await productQueries.getProductsByKeyword(keyword)
    return products
  } catch (e) {
    console.log(e)
  }
}
const updateProduct = async (data: Product, id: number): Promise<Product> => {
  try {
    const updatedProduct = await productQueries.updateProduct(id, data)
    return updatedProduct
  } catch (e) {
    console.log(e)
  }
}
const deleteProduct = async (id: number): Promise<Product> => {
  try {
    const deletedProduct = await productQueries.deleteProduct(id)

    return deletedProduct
  } catch (e) {
    console.log(e)
  }
}
const getProductById = async (id: number): Promise<Product> => {
  try {
    const product = await productQueries.getProductById(id)

    return product
  } catch (e) {
    console.log(e)
  }
}

export {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductsByKeyword,
}
