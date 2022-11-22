import { Request, Response, NextFunction } from 'express';
import {OrderModel} from '../../models/OrderModel';

const orderModel = new OrderModel();
const CreateController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        // console.log(req.body);
        const order = await orderModel.create(req.body);
        res.json({
            data: { ...order },
            message: 'Order created'
        });
    } catch (err) {
        next(err);
    }
}

export default CreateController;