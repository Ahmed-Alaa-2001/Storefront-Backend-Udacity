import { Request, Response,NextFunction } from 'express';
import { User, UserModel } from '../../models/UserModel';
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

