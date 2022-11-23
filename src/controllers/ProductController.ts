import { Request, Response, NextFunction } from 'express';
import { Product,ProductModel } from '../models/ProductModel';

const productModel = new ProductModel;
export const CreateController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        // console.log(req.body);
        const product:Product=await productModel.createNewProduct(req.body)
        res.json({
            status: 'success',
            data: { ...product },
            message: 'product created successfully'
        });
    } catch (err) {
        next(err);
    }
}

export const DeleteAllController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const deleteAll = await productModel.deleteAll();
        res.json({
            data:{deleteAll},
            message: 'products deleted successfully'
        })
    } catch(err) {
        next(err);
    }
}

export const DeleteOneController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const id: number = parseInt(req.params.id as string);
        const deleteOne = await productModel.deleteById(id);
        res.json({
            data:{deleteOne},
            message: 'products deleted successfully'
        })
    } catch(err) {
        next(err);
    }
}

export const EditController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const product:Product = await productModel.edit(req.body);
        console.log(req.body);
        res.json({
            status: 'success',
            message: 'product updated successfully',
            data: { product }
        });
    } catch (err) {
        next(err);
    }
}

export const ShowAllController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const showAllproducts = await productModel.showAll();
        res.json({
            message: 'products retrieved successfully',
            data: { showAllproducts }
        });
    } catch (err) {
        next(err);
    }
}

export const ShowOneController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const id: number = parseInt(req.params.id as string);
        const showOne = await productModel.showByID(id);
        res.json({
            data:{showOne},
            message: 'product retrieved successfully'
        })
    } catch(err) {
        next(err);
    }
}
