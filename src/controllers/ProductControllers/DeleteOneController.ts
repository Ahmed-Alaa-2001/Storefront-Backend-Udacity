import { NextFunction, Request, Response } from 'express';
import { ProductModel } from '../../models/ProductModel';

const productModel = new ProductModel;
const DeleteOneController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const id: number = parseInt(req.params.id as string);
        const deleteOne = await productModel.deleteById(id);
        res.json({
            data:{deleteOne},
            message: 'products deleted successfully'
        })
    } catch(err) {
        next(err);
    }
}

export default DeleteOneController;