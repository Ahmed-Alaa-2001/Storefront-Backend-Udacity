import { NextFunction, Request, Response } from 'express';
import { ProductModel } from '../../models/ProductModel';

const productModel = new ProductModel;
const ShowOneController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const id: number = parseInt(req.params.id as string);
        const showOne = await productModel.showByID(id);
        res.json({
            data:{showOne},
            message: 'product retrieved successfully'
        })
    } catch(err) {
        next(err);
    }
}

export default ShowOneController;