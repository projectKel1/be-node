import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

interface Attendances {
    user_id: number,
    is_checkout: boolean,
}

export const getDataAttendances = async (query: Attendances, skip: number, take: number) => {

    let data: any
    
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

export const createDataAttendances = async (userId: number) => {

    let data: Prisma.AttendanceCreateInput

    try {
        data = await prisma.attendance.create({
            data: {
                user_id: userId,
                is_checkout: false
            }
        })
    } catch (err: unknown) {
        console.log(err);
        return err
    }

    return data

}

export const detailsDataAttendances = async (attendancesId: number) => {

    const data = await prisma.attendance.findFirst({
        where: {
            id: attendancesId
        }
    })

    return data

}