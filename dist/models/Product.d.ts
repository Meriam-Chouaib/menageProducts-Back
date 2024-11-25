import { Document } from 'mongoose';
export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    stock: number;
}
declare const Product: import("mongoose").Model<IProduct, {}, {}, {}, Document<unknown, {}, IProduct> & IProduct & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Product;
