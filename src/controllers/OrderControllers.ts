import { Request, Response, NextFunction } from 'express';
import {OrderModel} from '../models/OrderModel';
const orderModel = new OrderModel();

export const CreateController = async (req: Request, res: Response,next:NextFunction) => {
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

export const DeleteOneController = async (req: Request, res: Response,next:NextFunction) => {
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

export const  EditController = async (req: Request, res: Response,next:NextFunction) => {
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

export const OrderByUserId = async (req: Request, res: Response,next:NextFunction) => {
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

export const ShowAllController = async (req: Request, res: Response,next:NextFunction) => {
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

export const ShowOneController = async (req: Request, res: Response,next:NextFunction) => {
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