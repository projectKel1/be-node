import { Prisma, PrismaClient } from "@prisma/client"
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

export const insertDataTarget = async (req: Request) => {

    const { product, quantity, ended_date } = req.body
    let target: Prisma.TargetCreateInput

    try {
        target = {
            user_id: req.user.userId,
            product: product,
            quantity: parseInt(quantity),
            ended_date: ended_date
        }

        await prisma.target.create({
            data: target
        })
    } catch (err: unknown) {
        throw new Error("internal server error")
    }

    return true

}