import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const getAllData = async (req: Request, res: Response) => {

    const prisma = new PrismaClient()
    let data: any

    try {
        data = await prisma.requestReimburses.findMany({
            where: req.query
        })
    } catch (err) {
        return res.status(400).json({
            status_code: 400,
            result: 'error',
            message: 'invalid params query'
        })
    }
    
    let json: any = []
    data.map((value: any) => {
        let data = {
            id: value.id,
            user_id: value.user_id,
            description: value.description,
            type: value.type,
            nominal: value.nominal.toString(),
            url_proof: value.url_proof,
            status: value.status,
            created_at: value.created_at,
            updated_at: value.updated_at,
            deleted_at: value.deleted_at
        }

        json.push(data)
    })

    return res.json({
        status_code: 200,
        result: 'success',
        message: 'successfully fetch data',
        data: json
    })

}