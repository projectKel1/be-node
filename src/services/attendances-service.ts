import { PrismaClient, Prisma } from "@prisma/client"
import { Request } from "express"
import { UserData } from "./reimbursement-service"
import { getAllUsers } from "../api/users"

interface Attendances {
    id: number,
    user_id: number,
    fullname?: string | undefined,
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

export const getDataAttendances = async (req: Request, skip: number, take: number) => {

    let attendances: Attendances[]
    let user: UserData[] | null
    let json: any = []
    let query: any = req.query

    if(req.user.level == "EMPLOYEE") {

        query.user_id = req.user.userId
        try {
            attendances = await prisma.attendance.findMany({
                where: query,
                skip: skip,
                take: take
            })
        } catch (err) {
            throw new Error("invalid params query")
        }

        return attendances

    } else {

        user = await getAllUsers(req, req.user.userId)

        try {
            attendances = await prisma.attendance.findMany({
                where: req.query,
                skip: skip,
                take: take
            })
        } catch (err) {
            throw new Error("invalid params query")
        }

        if(!attendances) return attendances

        attendances.map((value: Attendances) => {
            let username = user?.find((user: UserData) => user.id === value.user_id)

            let data = {
                id: value.id,
                user_id: value.user_id,
                fullname: username,
                is_checkout: value.is_checkout,
                created_at: value.created_at,
                updated_at: value.updated_at,
            }

            json.push(data)
        })

        return json.filter((value: any) => value.fullname !== undefined)

    }

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