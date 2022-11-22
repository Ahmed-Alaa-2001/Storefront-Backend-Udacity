import { Request, Response, NextFunction } from 'express';
import { User, UserModel } from '../../models/UserModel';
const userModel = new UserModel;
const ShowOneController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const id: number = parseInt(req.params.id as string);
        const showOne = await userModel.showByID(id);
        res.json({
            data:{showOne},
            message: 'user retrieved successfully'
        })
    } catch(err) {
        next(err);
    }
}

export default ShowOneController;