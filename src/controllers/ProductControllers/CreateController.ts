import { Request, Response, NextFunction } from 'express';
import { Product,ProductModel } from '../../models/ProductModel';

const productModel = new ProductModel;
const CreateController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        // console.log(req.body);
        const product:Product=await productModel.createNewProduct(req.body)
        res.json({
            status: 'success',
            data: { ...product },
            message: 'product created successfully'
        });
    } catch (err) {
        next(err);
    }
}

export default CreateController;