import { NextFunction, Request, Response } from 'express';
import { User,UserModel } from '../../models/UserModel';

const userModel = new UserModel;

const DeleteOneController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const id: number = parseInt(req.params.id as string);
        const deleteOne = await userModel.deleteById(id);
        res.json({
            data:{deleteOne},
            message: 'users deleted successfully'
        })
    } catch(err) {
        next(err);
    }
}

export default DeleteOneController;