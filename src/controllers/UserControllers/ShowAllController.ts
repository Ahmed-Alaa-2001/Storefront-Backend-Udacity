import { Request, Response, NextFunction } from 'express';
import { User, UserModel } from '../../models/UserModel'; 
const userModel=new UserModel
const ShowAllController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const showAllUsers = await userModel.showAll();
        res.json({
            message: 'users retrieved successfully',
            data: { showAllUsers }
        });
    } catch (err) {
        next(err);
    }
}

export default ShowAllController;