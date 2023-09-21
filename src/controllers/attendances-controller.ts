import { Request, Response } from "express";
import { checkoutAttendances, createDataAttendances, detailsDataAttendances, getDataAttendances } from "../services/attendances-service";
import { Attendance } from "@prisma/client";

export const getData = async (req: Request, res: Response) => {

    let skip: number = 0, take: number = 5
    let page: any = req.query.page
    let data: Attendance[]

    // limit pagination
    if(page) {
        page = parseInt(page)
        if(page > 1) skip = (page * 5) - 5
        else skip = 0
    }

    if(page) delete req.query.page

    try {
        data = await getDataAttendances(req, skip, take)
    } catch (err: any) {
        return res.status(400).json({
            status_code: 400,
            result: 'error',
            message: 'invalid params query'
        })
    }

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

export const createData = async (req: Request, res: Response) => {
    
    try {
        await createDataAttendances(req.user.userId)
    } catch (err: any) {
        return res.status(500).json({
            status_code: 500,
            result: 'error',
            message: err.message
        })
    }

    return res.json({
        status_code: 200,
        result: 'success',
        message: 'record present has been created'
    })

}

export const detailsData = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id)
    const data: Attendance | null = await detailsDataAttendances(id)

    if(!data) return res.status(404).json({
        status_code: 404,
        result: 'error',
        message: 'data not found',
        data: null
    })

    return res.json({
        status_code: 200,
        result: 'success',
        message: 'sucessfully fetch data',
        data: data
    })

}

export const updateData = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id)
    const data: boolean = await checkoutAttendances(id)

    if(!data) return res.status(404).json({
        status_code: 404,
        result: 'error',
        message: 'record to update not found'
    })

    return res.json({
        status_code: 200,
        result: 'success',
        message: 'successfully update record data',
        data: data
    })

}