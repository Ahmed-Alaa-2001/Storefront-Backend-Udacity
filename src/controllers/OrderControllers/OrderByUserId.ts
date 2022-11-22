import { NextFunction, Request, Response } from 'express';
import {OrderModel} from '../../models/OrderModel';

const orderModel = new OrderModel();

const OrderByUserId = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const order = await orderModel.OrderByUserId(req.params.id as unknown as number);
        res.json({
            message: 'Order retrieved',
            data: { order }
        });
    } catch (err) {
        next(err);
    }
}

export default OrderByUserId;