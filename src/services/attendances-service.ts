import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getDataAttendaces = async (query: any, skip: number, take: number) => {

    let data: any

    if(query.is_checkout) {
        if(query.is_checkout == "true") query.is_checkout = true
        if(query.is_checkout == "false") query.is_checkout = false
    }
    
    try {
        data = await prisma.attendance.findMany({
            where: query,
            skip: skip,
            take: take
        })
    } catch (err) {
        return null
    }

    return data

}