import { Product } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import * as productService from '../services/product.service'
import { GetProductsParams } from '@app/type/product.type'

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { price, quantity, userId, description, ...rest } = req.body

    const images = req.files as Express.Multer.File[]
    if (!images || images.length === 0) {
      throw new Error('No images provided')
    }

    const imagePaths = images.map((file) => file.filename) // Store file paths
    const data: Product = {
      ...rest,
      price: Number(price),
      quantity: Number(quantity),
      userId: Number(userId),
      description: description || 'No description provided',
    }
    console.log('🚀 ~ data:', data)

    const product = await productService.createProduct(data, imagePaths)

    res.status(httpStatus.OK).send(product)
  } catch (e) {
    res.status(400).send(e.message)
    next(e)
  }
}

const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { page, rowsPerPage } = req.query
    let filterFields: GetProductsParams = {
      page: Number(page),
      rowsPerPage: Number(rowsPerPage),
    }

    const products = await productService.getProducts(filterFields)
    res.status(httpStatus.OK).send(products)
  } catch (e) {
    next(e)
    res.status(500).json({ error: e.message || 'Internal Server Error' })
  }
}
const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const productId = parseInt(req.query.id as string, 10)
    if (!req.query.id || isNaN(productId)) {
      res.status(400).json({ error: 'Invalid or missing product ID' })
    }
    const { price, quantity, ...rest } = req.body
    const images = req.files as Express.Multer.File[]

    const imagePaths = images.map((file) => file.path) // Store file paths

    const updatedData: Product = {
      ...rest,
      price: Number(price),
      quantity: Number(quantity),
      images: imagePaths,
    }

    const updatedProduct = await productService.updateProduct(
      updatedData,
      productId
    )
    res.status(httpStatus.OK).send(updatedProduct)
  } catch (e) {
    next(e)
    res.status(500).json({ error: e.message || 'Internal Server Error' })
  }
}
const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const productId = parseInt(req.query.id as string, 10)
    if (!req.query.id || isNaN(productId)) {
      res.status(400).json({ error: 'Invalid or missing product ID' })
    }
    const deletedProduct = await productService.deleteProduct(productId)
    if (deletedProduct) {
      res.status(200).json({
        message: 'Product deleted successfully',
        product: deletedProduct,
      })
    } else {
      res.status(404).json({ error: 'Product not found' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message || 'Internal Server Error' })
  }
}
const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = parseInt(req.params.id as string, 10)
    if (!req.params.id || isNaN(productId)) {
      res.status(400).json({ error: 'Invalid or missing product ID' })
    }
    const product = await productService.getProductById(productId)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.status(httpStatus.OK).send(product)
  } catch (e) {
    //  next(e)
    // res.status(500).json({ error: e.message || 'Internal Server Error' })
    console.log(e.message)
  }
}
const getProductsByKeyword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const keyword = req.params.search as string

    if (!keyword) {
      res.status(400).json({ error: 'Invalid or missing keyword' })
    }

    const products = await productService.getProductsByKeyword(keyword)
    res.status(httpStatus.OK).send(products)
  } catch (e) {
    console.log(e.message)
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
