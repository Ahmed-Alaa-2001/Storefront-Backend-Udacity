import { NextFunction, Request, Response } from 'express';
import {OrderModel} from '../../models/OrderModel';

const orderModel = new OrderModel();

const ShowOneController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const order = await orderModel.showById(req.params.id as unknown as number);
        res.json({
            data: { order },
            message: 'Order retrieved'
        });
    } catch (err) {
        next(err);
    }
}

export default ShowOneController;