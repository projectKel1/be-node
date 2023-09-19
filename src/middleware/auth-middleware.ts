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
    let user: any
    try {
        user = jwt.verify(token, secretKey)    
    } catch (err: any) {
        if(err.message === 'jwt expired') return res.status(401).json({
            status_code: 401,
            result: 'error',
            message: 'unauthorized'
        })
    }

    req.user = user 
    req.user.token = "Bearer " + token
    return next()

}