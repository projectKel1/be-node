import { Request } from "express";
import { Attendances } from "../../../repositories/attendances";
import { getAllData } from "../../../repositories/attendances";

export default async (req: Request, skip: number, take: number) => {

    let attendances: Attendances[]

    req.query.user_id = req.user.userId

    try {
        attendances = await getAllData(req, skip, take)
    } catch (err: any) {
        throw new Error(err.message)
    }

    return attendances

}