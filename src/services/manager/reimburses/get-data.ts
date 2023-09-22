import { Request } from "express";
import { Reimburses } from "../../../repositories/reimbursement"; 
import { getAllData } from "../../../repositories/reimbursement";

export default async (req: Request, skip: number, take: number) => {

    let reimbursement: Reimburses[]

    req.query.user_id = req.user.userId

    try {
        reimbursement = await getAllData(req, skip, take)
    } catch (err: any) {
        throw new Error(err.message)
    }

    for(let data of reimbursement) {
        data.nominal = data.nominal.toString()
    }

    return reimbursement

}