import { NextFunction, Request, Response } from 'express';
import { Product,ProductModel } from '../../models/ProductModel';

const productModel = new ProductModel;
const EditController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const product:Product = await productModel.edit(req.body);
        console.log(req.body);
        res.json({
            status: 'success',
            message: 'product updated successfully',
            data: { product }
        });
    } catch (err) {
        next(err);
    }
}

export default EditController;