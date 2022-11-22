import { NextFunction, Request, Response } from 'express';
import {OrderProductModel} from '../../models/OrderProductModel';

const orderProductModel = new OrderProductModel();

const EditController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const orderProduct = await orderProductModel.edit(req.body);
        res.json({
            message: 'order Product updated successfully',
            data: { orderProduct }
        });
    } catch (err) {
        next(err);
    }
}

export default EditController;