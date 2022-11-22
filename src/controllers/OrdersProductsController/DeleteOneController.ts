import { NextFunction, Request, Response } from 'express';
import {OrderProductModel} from '../../models/OrderProductModel';

const orderProductModel = new OrderProductModel();

const DeleteOneController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const orderProduct = await orderProductModel.delete(req.body.orderId, req.body.productId);
        res.json({
            message: 'Order Product deleted successfully',
            data: { orderProduct }
        });
    } catch (err) {
        next(err);
    }
}

export default DeleteOneController;