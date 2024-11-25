import { Request, Response, NextFunction } from 'express';
declare const createProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getProducts: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const updateProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const deleteProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getProductById: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
declare const getProductsByKeyword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { createProduct, getProducts, updateProduct, deleteProduct, getProductById, getProductsByKeyword, };
