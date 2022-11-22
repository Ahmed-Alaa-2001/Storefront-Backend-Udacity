import { Request, Response, NextFunction } from 'express';
const tstt = (req: Request, res: Response) => {
    res.json({
        message: 'Hello World Api 🌍'
    })
}
export default tstt;