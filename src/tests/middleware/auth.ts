import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const requireAuth = (req: Request, res: Response, next: NextFunction):void => {
    try {
        const ourToken = process.env.SECRET_TOKEN;
        const authHeader=req.headers.authorization as string
        // const bearer = authHeader.split(' ')[0].toLowerCase();
        const token = authHeader.split(' ')[1];
        jwt.verify(token, ourToken as Secret);
        next();
    } catch (err) {
        res.sendStatus(401);
    }
};

export default requireAuth;
