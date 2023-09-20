import { PrismaClient, Prisma } from "@prisma/client"

interface Attendances {
    id: number,
    user_id: number,
    is_checkout: boolean,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date | null
}

const prisma = new PrismaClient().$extends({
    model: {
        attendance: {
            async checkout(id: number) {
                return await prisma.attendance.update({
                    where: {
                        id: id
                    },
                    data: {
                        is_checkout: true
                    }
                })
            }
        }
    }
})

export const getDataAttendances = async (query: Attendances, skip: number, take: number) => {

    let data: Attendances[]
    
    try {
        data = await prisma.attendance.findMany({
            where: query,
            skip: skip,
            take: take
        })
    } catch (err) {
        throw new Error("Invalid params query")
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
        throw new Error("internal server error")
    }

    return data

}

export const detailsDataAttendances = async (attendanceId: number) => {

    const data = await prisma.attendance.findFirst({
        where: {
            id: attendanceId
        }
    })

    return data

}

export const checkoutAttendances = async (attendanceId: number) => {

    try {
        await prisma.attendance.checkout(attendanceId)
    } catch (err) {
        return false
    }

    return true

}