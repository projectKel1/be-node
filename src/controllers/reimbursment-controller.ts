import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const getAllData = async (req: Request, res: Response) => {

    let data: any
    let skip = 0, take = 20
    let page: any = req.query.page

    // limit pagination
    if(page) {
        page = parseInt(page)
        if(page > 1) skip = (page * 10) - 10
        else skip = 0
    }

    if(page) delete req.query.page

    try {
        data = await prisma.requestReimburses.findMany({
            where: req.query,
            skip: skip,
            take: take
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

    if(!json.length && page) return res.status(404).json({
        status_code: 404,
        result: 'error',
        message: 'data not found',
        data: json
    })

    return res.json({
        status_code: 200,
        result: 'success',
        message: 'successfully fetch data',
        data: json
    })

}

export const createData = async (req: Request, res: Response) => {

    const { description, type, nominal, url_proof } = req.body
    let requestReimburses: Prisma.RequestReimbursesCreateInput
    let data: any

    try {
        requestReimburses = {
            user_id: 5,
            description: description,
            type: type,
            nominal: BigInt(nominal),
            url_proof: url_proof
        } 

        data = await prisma.requestReimburses.create({
            data: requestReimburses
        })
    } catch (err: any) {
        return res.status(500).json({
            status_code: 500,
            result: 'error',
            message: 'internal server error'
        })
    }

    return res.send('a')

}