import { Request, Response, NextFunction } from 'express';
import {OrderProductModel} from '../../models/OrderProductModel';

const orderProductModel = new OrderProductModel();
const CreateController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const orderProduct = await orderProductModel.create(req.body);
        res.json({
            message: 'Order Product created',
            data: { ...orderProduct }
        });
    } catch (err) {
        next(err);
    }
}

export default CreateController;