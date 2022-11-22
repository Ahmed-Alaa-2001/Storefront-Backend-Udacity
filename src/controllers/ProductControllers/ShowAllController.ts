import { NextFunction, Request, Response } from 'express';
import { ProductModel } from '../../models/ProductModel';

const productModel = new ProductModel;
const ShowAllController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const showAllproducts = await productModel.showAll();
        res.json({
            message: 'products retrieved successfully',
            data: { showAllproducts }
        });
    } catch (err) {
        next(err);
    }
}

export default ShowAllController;