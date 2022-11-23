import { Request, Response,NextFunction } from 'express';
import { User, UserModel } from '../models/UserModel';
import jwt from 'jsonwebtoken';
// import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();
const secretToken = process.env.SECRET_TOKEN;
const userModel = new UserModel;
export const postSignUp = async (req: Request, res: Response,next: NextFunction) => {
    try {
        // console.log(req.body);
        const user:User=await userModel.createNewUser(req.body)
        const token = jwt.sign({ user }, secretToken as string);
        res.json({
            status: 'success',
            data: { ...user, token },
            message: 'user created successfully'
        });
    } catch (err) {
        next(err);
    }
}

export const postLogIn = async (req: Request, res: Response,next: NextFunction) => {
    try {
        const userName = req.body.user_name;
        const password = req.body.password;
        const user = await userModel.login(userName, password);
        // console.log(user);
        if (user) {
            const token = jwt.sign({ user }, secretToken as string);
            // return res.json({
            //     data: { ...user, token },
            //     message: 'user authenticated successfully'
            // });
            res.json(token);
        }
        else {
            res.sendStatus(401)
        }
        return res.sendStatus(401).json({
            message: 'the username and password do not match'
        });
    } catch (err) {
        next(err);
    }
}

export const DeleteAllController = async (req: Request, res: Response,next:NextFunction) => {
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

export const DeleteOneController = async (req: Request, res: Response,next:NextFunction) => {
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

export const EditController = async (req: Request, res: Response,next:NextFunction) => {
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

export const ShowAllController = async (req: Request, res: Response,next:NextFunction) => {
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

export const ShowOneController = async (req: Request, res: Response,next:NextFunction) => {
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

