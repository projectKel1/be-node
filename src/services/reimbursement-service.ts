import { PrismaClient, Prisma } from "@prisma/client";

interface Reimburses {
    id: number,
    user_id: number,
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

export const getDataReimbursement = async (query: any, skip: number, take: number) => {
    
    // TODO: read data based on their roles

    let data: Reimburses[]
    try {
        data = await prisma.requestReimburses.findMany({
            where: query,
            skip: skip,
            take: take
        })
    } catch (err) {
        return null
    }

    let json: Reimburses[] = []

    data.map((value: any) => {

        let data:any = {
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

export const insertDataReimbursement = async (req: any) => {

    const { description, type, nominal, url_proof } = req.body
    let requestReimburses: Prisma.RequestReimbursesCreateInput

    try {
        requestReimburses = {
            user_id: req.user.id,
            description: description,
            type: type,
            nominal: BigInt(nominal),
            url_proof: url_proof
        } 

        await prisma.requestReimburses.create({
            data: requestReimburses
        })
    } catch (err: unknown) {
        return false
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
        return false
    } 

    return data

}

export const updateDataReimbursement = async (req: any) => {

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
        return null
    }

    return data

}

export const deleteDataReimbursement = async (id: number) => {

    try {
        await prisma.requestReimburses.softDelete(id)
    } catch (err) {
        return null
    }

    return true

}