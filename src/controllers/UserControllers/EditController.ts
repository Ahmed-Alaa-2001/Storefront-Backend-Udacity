import { Request, Response, NextFunction } from 'express';
import { User,UserModel } from '../../models/UserModel';

const userModel = new UserModel;

const EditController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const user:User = await userModel.edit(req.body);
        console.log(req);
        res.json({
            status: 'success',
            message: 'user updated successfully',
            data: { user }
        });
    } catch (err) {
        next(err);
    }
}

export default EditController;