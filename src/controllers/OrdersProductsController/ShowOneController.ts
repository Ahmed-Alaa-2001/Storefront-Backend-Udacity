import { NextFunction, Request, Response } from 'express';
import {OrderProductModel} from '../../models/OrderProductModel';

const orderProductModel = new OrderProductModel();

const ShowOneController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const orderProduct = await orderProductModel.showProduct(req.body.orderId, req.body.productId);
        res.json({
            message: 'Product at target Order retrieved successfully',
            data: { orderProduct }
        });
    } catch (err) {
        next(err);
    }
}

export default ShowOneController;