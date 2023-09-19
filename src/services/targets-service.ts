import { PrismaClient } from "@prisma/client"
import { Request } from "express"

export interface targetType {
    id: number,
    user_id: number,
    product: string,
    quantity: number,
    ended_date: Date,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date | null
}

const prisma = new PrismaClient()

export const getDataTargets = async (req: Request, skip: number, take: number) => {

    let data: targetType[]
    try {
        data = await prisma.target.findMany({
            where: req.query,
            skip: skip,
            take: take
        })
    } catch (err) {
        throw new Error("invalid params query")
    }

    return data

}