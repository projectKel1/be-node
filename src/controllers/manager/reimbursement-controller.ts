import { Reimburses } from "../../repositories/reimbursement"
import { Request, Response } from "express"
import getDataReimbursement from '../../services/manager/reimburses/get-data'

export const index = async (req: Request, res: Response) => {

    let data: Reimburses[]

    let skip: number = 0, take: number = 5
    let page: any = req.query.page

    // limit pagination
    if(page) {
        page = parseInt(page)
        if(page > 1) skip = (page * 5) - 5
        else skip = 0
    }

    if(page) delete req.query.page

    try {
        data = await getDataReimbursement(req, skip, take)
    } catch (err: any) {
        return res.status(400).json({
            status_code: 400,
            result: 'error',
            message: err.message
        })
    }

    if(!data.length && page) return res.status(404).json({
        status_code: 404,
        result: 'error',
        message: 'data not found',
        data: data
    })

    return res.json({
        status_code: 200,
        result: 'success',
        message: 'successfully fetch data',
        data: data
    })

}