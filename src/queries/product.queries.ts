import { Product } from '@prisma/client'
import { getDbInstance } from '../database'

const db = getDbInstance()

export const createProduct = async (
  product: Product,
  images: string[]
): Promise<Product> => {
  console.log('🚀 ~ createProduct ~ product:', product)
  const { category, name, price, quantity, userId, description } = product
  try {
    const newProduct = await db.product.create({
      data: {
        name,
        category,
        price,
        quantity,
        userId,
        description,
      },
    })

    const imagePromises = images.map(async (imageUrl) => {
      return db.image.create({
        data: {
          url: imageUrl,
          productId: newProduct.id,
        },
      })
    })

    await Promise.all(imagePromises)

    return db.product.findUnique({
      where: { id: newProduct.id },
      include: { images: true },
    })
  } catch (error) {
    console.log('Error message:', error.message)
    throw error
  }
}
export const getProducts = async (page: number, rowsPerPage: number) => {
  try {
    const skip = (page - 1) * rowsPerPage

    const productsTotal = await db.product.findMany()
    const products = await db.product.findMany({
      skip,
      take: rowsPerPage,
      include: {
        images: true,
      },
    })
    const totalCount = productsTotal.length

    return { products, totalCount }
  } catch (error) {
    throw new Error('Failed to fetch products')
  }
}
export const getProductsByKeyword = async (
  keyword: string
): Promise<Product[]> => {
  try {
    const products = await db.product.findMany({
      where: {
        OR: [
          { name: { contains: keyword } },
          { description: { contains: keyword } },
          { category: { contains: keyword } },
        ],
      },
      include: {
        images: true,
      },
    })
    return products
  } catch (error) {
    throw new Error('Failed to fetch products by keyword')
  }
}
export const updateProduct = async (
  id: number,
  data: Product
): Promise<Product> => {
  try {
    const updatedProduct = await db.product.update({
      where: { id },

      data,
    })
    return updatedProduct
  } catch (error) {
    console.log('error', error.message)

    throw new Error('Failed to update product')
  }
}
export const deleteProduct = async (id: number): Promise<Product> => {
  try {
    const deletedProduct = await db.product.delete({
      where: { id },
    })
    return deletedProduct
  } catch (error) {
    throw new Error('Failed to delete product')
  }
}
export const getProductById = async (id: number): Promise<Product> => {
  try {
    const product = await db.product.findUnique({
      where: { id },
      include: {
        images: true,
      },
    })
    return product
  } catch (error) {
    throw new Error('Failed to fetch product by id')
  }
}
