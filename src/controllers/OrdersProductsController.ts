import { Request, Response, NextFunction } from 'express';
import {OrderProductModel} from '../models/OrderProductModel';

const orderProductModel = new OrderProductModel();
export const CreateController = async (req: Request, res: Response,next:NextFunction) => {
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

export const DeleteOneController = async (req: Request, res: Response,next:NextFunction) => {
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

export const EditController = async (req: Request, res: Response,next:NextFunction) => {
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

export const ShowAllController = async (req: Request, res: Response,next:NextFunction) => {
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

export const ShowOneController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const orderProduct = await orderProductModel.showProduct(req.body.orderId, req.body.productId);
        res.json({
            message: 'Product at target Order retrieved successfully',
            data: { orderProduct }
        });
    } catch (err) {
        next(err);
    }
}
