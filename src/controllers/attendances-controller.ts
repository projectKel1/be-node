import { Request, Response } from "express";
import { getDataAttendaces } from "../services/attendances-service";

export const getData = async (req: Request, res: Response) => {

    let skip: number = 0, take: number = 5
    let page: any = req.query.page
    let query: any = req.query

    // limit pagination
    if(page) {
        page = parseInt(page)
        if(page > 1) skip = (page * 5) - 5
        else skip = 0
    }

    if(page) delete req.query.page

    const data = await getDataAttendaces(query, skip, take)

    if(!data) return res.status(400).json({
        status_code: 400,
        result: 'error',
        message: 'invalid params query'
    })

    if(!data.length && page) return res.status(404).json({
        status_code: 404,
        result: 'error',
        message: 'data not found'
    })

    return res.json({
        status_code: 200,
        result: 'success',
        message: 'successfully fetch data',
        data: data
    })

}