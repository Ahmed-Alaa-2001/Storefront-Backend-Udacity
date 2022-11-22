import { NextFunction, Request, Response } from 'express';
import {OrderModel} from '../../models/OrderModel';

const orderModel = new OrderModel();

const DeleteOneController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const order = await orderModel.deleteById(req.params.id as unknown as number);
        res.json({
            message: 'Order deleted successfully',
            data: { order }
        });
    } catch (err) {
        next(err);
    }
}

export default DeleteOneController;