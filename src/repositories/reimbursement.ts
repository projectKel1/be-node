import { PrismaClient } from "@prisma/client"
import { Request } from "express"

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
})

export const getAllData = async (req: Request, skip: number, take: number) => {

    let reimbursement: Reimburses[]

    try {
        reimbursement = await prisma.requestReimburses.findMany({
            where: req.query,
            skip: skip,
            take: take
        })
    } catch (err) {
        throw new Error("invalid params query")
    }

    return reimbursement

}