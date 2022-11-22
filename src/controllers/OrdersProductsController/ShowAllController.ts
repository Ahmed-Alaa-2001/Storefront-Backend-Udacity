import { NextFunction, Request, Response } from 'express';
import {OrderProductModel} from '../../models/OrderProductModel';

const orderProductModel = new OrderProductModel();

const ShowAllController = async (req: Request, res: Response,next:NextFunction) => {
    try {        
        const orderProducts = await orderProductModel.showallProducts(req.params.id as unknown as number);
        res.json({
            message: 'Order Products retrieved successfully',
            data: { orderProducts }
        });
    } catch (err) {
        next(err);
    }
}

export default ShowAllController;