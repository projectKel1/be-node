import { Request, Response } from 'express';
import { 
    getAllTargetReports, 
    createTargetReportRecord, 
    getTargetReportDetails, 
    updateTargetReportRecord, 
    deleteTargetReportRecord, 
} from '../services/report-service';


export const getAllData = async (req: Request, res: Response) => {
    let skip: number = 0, take: number = 5
    let page: any = req.query.page
    let status: any = req.query.status
    let user: any = req.query.user

    // limit pagination
    if(page) {
    page = parseInt(page)
    if(page > 1) skip = (page * 5) - 5
    else skip = 0
    }

    if(page) delete req.query.page

    const targetReports: any = await getAllTargetReports(skip, take, status, user)
    res.status(200).json({
        status_code: 200,
        result: 'success',
        message: 'successfully fetch data',
        data: targetReports
    });
}

export const createData = async (req: Request, res: Response) => {
    try {
        const { user_id, target_id, status, url_proof } = req.body;
        await createTargetReportRecord(user_id, target_id, status, url_proof);
        res.status(200).json({
            status_code: 200,
            result: 'success',
            message: 'record has been created',
        });
    } catch (error) {
        res.status(400).json({
            status_code: 400,
            result: 'error',
            message: 'status field is required',
        });
    }
}

export const detailsData = async (req: Request, res: Response) => {
    const id = req.params.id;
    const targetReport = await getTargetReportDetails(id);
    if (!targetReport) {
        return res.status(404).json({
            status_code: 404,
            result: 'error',
            message: 'data not found',
            data: null,
        });
    }
    res.status(200).json({
        status_code: 200,
        result: 'success',
        message: 'successfully fetch data',
        data: targetReport
    });
}

export const updateData = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { user_id, target_id, status, url_proof } = req.body;
        const updatedTargetReport = await updateTargetReportRecord(id, user_id, target_id, status, url_proof);
        if (!updatedTargetReport) {
            return res.status(404).json({
                status_code: 404,
                result: 'error',
                message: 'data not found',
                data: null,
            });
        }
        res.status(200).json({
            status_code: 200,
            result: 'success',
            message: 'successfully update data',
            data: updatedTargetReport
        });
    } catch (error) {
        res.status(400).json({
            status_code: 400,
            result: 'error',
            message: 'status field is required',
        });
    }
}
  
export const deleteData = async (req: Request, res: Response) => {
    const id = req.params.id;
    const deleted = await deleteTargetReportRecord(id);
     if (!deleted) {
         return res.status(404).json({
            status_code: 404,
            result: 'error',
            message: 'data not found',
        });
    }
    res.status(200).json({
        status_code: 200,
        result: 'success',
        message: 'record has been deleted',
    });
    
}