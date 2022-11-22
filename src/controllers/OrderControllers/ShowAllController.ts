import { NextFunction, Request, Response } from 'express';
import {OrderModel} from '../../models/OrderModel';

const orderModel = new OrderModel();

const ShowAllController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const orders = await orderModel.showAll();
        res.json({
            data: { orders },
            message: 'Orders retrieved'
        });
    } catch (err) {
        next(err);
    }
}

export default ShowAllController;