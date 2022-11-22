import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../../models/UserModel';

const userModel = new UserModel;

const DeleteAllController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const deleteAll = await userModel.deleteAll();
        res.json({
            data:{deleteAll},
            message: 'users deleted successfully'
        })
    } catch(err) {
        next(err);
    }
}

export default DeleteAllController;