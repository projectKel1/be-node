import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export default async (req: Request, res: Response, next: NextFunction) => {

    let token: any = req.headers.authorization
    let secretKey: any = process.env.SECRET_KEY

    if(!token) return res.status(401).json({
        status_code: 401,
        result: 'error',
        message: 'unauthorized'
    })

    token = req.headers.authorization?.split(' ')[1]

    try {
        token = jwt.verify(token, secretKey)    
    } catch (err: any) {
        if(err.message === 'jwt expired') return res.status(401).json({
            status_code: 401,
            result: 'error',
            message: 'unauthorized'
        })
    }

    req.user = token    
    return next()

}