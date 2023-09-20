import { NextFunction, Request, Response } from "express";
import { Target, deleteDataTarget, detailsDataTarget, getDataTargets, insertDataTarget, updateDataTarget } from "../services/targets-service";

export const getAllData = async (req: Request, res: Response, next: NextFunction) => {

    let data: Target[]

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
        data = await getDataTargets(req, skip, take)
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
        await insertDataTarget(req)
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
        message: 'record has been created'
    })

}

export const detailsData = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id)
    const data: Target | null = await detailsDataTarget(req, id)

    if(!data) return res.status(404).json({
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

export const updateData = async (req: Request, res: Response) => {

    let data: Target | null

    try {
        data = await updateDataTarget(req)
    } catch (err: any) {
        return res.status(404).json({
            status_code: 404,
            result: 'error',
            message: err.message
        })
    }

    return res.json({
        status_code: 200,
        result: 'success',
        message: 'successfuly update data',
        data: data
    })

}

export const deleteData = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id)
    const data: boolean = await deleteDataTarget(req, id)

    if(!data) return res.status(404).json({
        status_code: 404,
        result: 'error',
        message: 'record to delete not found'
    })

    return res.json({
        status_code: 200,
        result: 'success',
        message: 'successfully deleted data'
    })

}