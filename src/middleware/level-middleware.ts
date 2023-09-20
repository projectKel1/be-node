import { NextFunction, Request, Response } from "express"

export default (allowedLevel: string | string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        
        if(!allowedLevel.includes(req.user.level.toLowerCase())) return res.status(401).json({
            status_code: 401,
            result: 'error',
            message: 'unauthorized'
        })
        
        return next()

    }
}