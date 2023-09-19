import { PrismaClient, Prisma } from "@prisma/client";
import { Request } from "express";

export interface Reimburses {
    id: number,
    user_id: number,
    fullname?: string,
    description: string,
    type: string,
    nominal: bigint | string,
    url_proof: string | null,
    status: string,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date | null
}

export interface Userdata {
    id: number,
    fullname: string
}

const prisma = new PrismaClient().$extends({
    query: {
        requestReimburses: {
            async findMany({model, operation, args, query}) {
                args.where = {
                    type: args.where?.type,
                    status: args.where?.status,
                    deleted_at: null
                }
                return query(args)
            },
        }
    },
    model: {
        requestReimburses: {
            async softDelete(id: number) {
                await prisma.requestReimburses.update({
                    where: {
                        id: id
                    },
                    data: {
                        deleted_at: new Date().toISOString()
                    }
                })
            }
        }
    }
})

export const getDataReimbursement = async (req: Request, skip: number, take: number) => {
    // FIXME: read data reimbursement based on their roles
    let reimbursementData: Reimburses[]
    // let userData: Userdata[] = []
    let json: Reimburses[] = []
    
    if(req.user.level === "EMPLOYEE") {
        req.query.id = req.user.userId
        try{
            reimbursementData = await prisma.requestReimburses.findMany({
                skip: skip,
                take: take
            })
        } catch (err) {
            throw new Error("invalid params query")
        }
    } else {
        // TODO: parseint request params query by user_id: id
        try {
            reimbursementData = await prisma.requestReimburses.findMany({
                where: req.query,
                skip: skip,
                take: take
            })
        } catch (err) {
            throw new Error("invalid params query")
        }
    }

    reimbursementData.map((value: Reimburses) => {
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

    return json

}

export const insertDataReimbursement = async (req: Request) => {

    const { description, type, nominal, url_proof } = req.body
    let requestReimburses: Prisma.RequestReimbursesCreateInput
    try {
        requestReimburses = {
            user_id: req.user.userId,
            description: description,
            type: type,
            nominal: BigInt(nominal),
            url_proof: url_proof
        } 

        await prisma.requestReimburses.create({
            data: requestReimburses
        })
    } catch (err: unknown) {
        throw new Error("internal server error")
    }

    return true

}

export const detailsDataReimbursement = async (id: number) => {

    let data: Reimburses | null

    try {
        data = await prisma.requestReimburses.findFirst({
            where: {
                id: id
            }
        })
    } catch (error: unknown) {        
        throw new Error("data not found")
    } 

    return data

}

export const updateDataReimbursement = async (req: Request) => {

    let data: Reimburses
    const { description, type, nominal, url_proof } = req.body
        
    try {
        data = await prisma.requestReimburses.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                user_id: req.user.id,
                description: description,
                type: type,
                nominal: nominal,
                url_proof: url_proof
            }
        })
    } catch (err: unknown) {
        throw new Error("record to update not found")
    }

    return data

}

export const deleteDataReimbursement = async (id: number) => {

    try {
        await prisma.requestReimburses.softDelete(id)
    } catch (err) {
        return false
    }

    return true

}