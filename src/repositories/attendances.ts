import { PrismaClient } from "@prisma/client"
import { Request } from "express"

export interface Attendances {
    id: number,
    user_id: number,
    fullname?: string | undefined,
    is_checkout: boolean,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date | null
}

const prisma = new PrismaClient()

export const getAllData = async (req: Request, skip: number, take: number) => {

    let attendances: Attendances[]

    try {
        attendances = await prisma.attendance.findMany({
            where: req.query,
            skip: skip,
            take: take
        })
    } catch (err) {
        throw new Error("invalid params query")
    }

    return attendances

}