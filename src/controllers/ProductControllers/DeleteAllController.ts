import { Request, Response, NextFunction } from 'express';
import { ProductModel } from '../../models/ProductModel';

const productModel = new ProductModel;
const DeleteAllController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const deleteAll = await productModel.deleteAll();
        res.json({
            data:{deleteAll},
            message: 'products deleted successfully'
        })
    } catch(err) {
        next(err);
    }
}

export default DeleteAllController;