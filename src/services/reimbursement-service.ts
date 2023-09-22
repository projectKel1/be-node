import { PrismaClient, Prisma } from "@prisma/client";
import { Request } from "express";
import { Reimburses } from "../repositories/reimbursement";
import { getAllUsers } from "../api/users";

export interface UserData {
    id: number,
    fullname: string
}

const prisma = new PrismaClient().$extends({
    query: {
        requestReimburses: {
            async findMany({model, operation, args, query}) {
                args.where = {
                    user_id: args.where?.user_id,
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
            async softDelete(userId: number, id: number) {
                await prisma.requestReimburses.update({
                    where: {
                        user_id: userId,
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

    let reimbursement: Reimburses[] = []
    let userdata: UserData[] | null = []
    let json: any[] = []

    if(req.user.level.toLowerCase() == "employee") {

        req.query.user_id = req.user.userId 
        
        try {
            reimbursement = await prisma.requestReimburses.findMany({
                where: req.query,
                skip: skip,
                take: take
            })

            for(let data of reimbursement) {
                data.fullname = req.user.full_name
                data.nominal = data.nominal.toString()
            }
        } catch (err) {
            throw new Error("invalid params query")
        }

        return reimbursement

    } else {

        userdata = await getAllUsers(req, req.user.userId)
        
        try {
            reimbursement = await prisma.requestReimburses.findMany({
                where: req.query,
                skip: skip,
                take: take
            })
        } catch (err) {
            throw new Error("invalid params query")
        }

        reimbursement.map((value: Reimburses) => {
            let user = userdata?.find((user: UserData) => {
                return user.id == value.user_id
            })
            
            let data = {
                id: value.id,
                user_id: value.user_id,
                fullname: user?.fullname,
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

        return json.filter((value: any) => value.fullname !== undefined)

    }

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

export const detailsDataReimbursement = async (req: Request, id: number) => {

    const data: Reimburses | null = await prisma.requestReimburses.findFirst({
        where: {
            id: id
        }
    })

    if(req.user.level == "Employee" && data?.user_id !== req.user.userId) return null
    return data

}

export const updateDataReimbursement = async (req: Request) => {

    let data: Reimburses
    const { description, type, nominal, url_proof } = req.body
    let query: any = {}

    query.id = parseInt(req.params.id)
    if(req.user.level == "Employee") query.user_id = req.user.userId

    try {
        data = await prisma.requestReimburses.update({
            where: query,
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

export const deleteDataReimbursement = async (req: Request, id: number) => {

    try {
        await prisma.requestReimburses.softDelete(req.user.userId, id)
    } catch (err) {
        return false
    }

    return true

}