import { Prisma, PrismaClient } from "@prisma/client"
import { Request } from "express"

export interface Target {
    id: number,
    user_id: number,
    product: string,
    quantity: number,
    ended_date: Date,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date | null
}

const prisma = new PrismaClient().$extends({
    query: {
        target: {
            async findMany({model, operation, args, query}){
                args.where = {
                    user_id: args.where?.user_id,
                    deleted_at: null
                }

                return query(args)
            }
        }
    },
    model: {
        target: {
            async softDelete(id: number, userId: number){
                await prisma.target.update({
                    where: {
                        id: id,
                        user_id: userId
                    },
                    data: {
                        deleted_at: new Date().toISOString()
                    }
                })
            }
        }
    }
})

export const getDataTargets = async (req: Request, skip: number, take: number) => {

    let data: Target[]
    try {
        req.query.user_id = req.user.userId
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

export const detailsDataTarget = async (req: Request, id: number) => {

    const data: Target | null = await prisma.target.findFirst({
        where: {
            id: id
        }
    })

    if(req.user.level == "Employee" && data?.user_id != req.user.userId) return null
    else return data

}

export const updateDataTarget = async (req: Request) => {

    let data: Target
    const { product, quantity, ended_date } = req.body

    try {
        data = await prisma.target.update({
            where: {
                id: parseInt(req.params.id),
                user_id: req.user.userId
            },
            data: {
                product: product,
                quantity: parseInt(quantity),
                ended_date: ended_date
            }
        })
    } catch (err: unknown) {
        throw new Error("record to update not found")
    }

    return data

}

export const deleteDataTarget = async (req: Request, id: number) => {

    try {
        await prisma.target.softDelete(id, req.user.userId)
    } catch (err) {
        return false
    }

    return true

}