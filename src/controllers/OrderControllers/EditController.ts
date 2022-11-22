import { NextFunction, Request, Response } from 'express';
import {OrderModel} from '../../models/OrderModel';

const orderModel = new OrderModel();

const EditController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const order = await orderModel.edit(req.body);
        res.json({
            message: 'Order updated successfully',
            data: { order }
        });
    } catch (err) {
        next(err);
    }
}

export default EditController;