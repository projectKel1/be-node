import { Request, Response } from 'express';
import { deleteDataRequestLeave, getDataRequestLeaves, insertDataRequestLeaves, updateDataRequestLeave } from '../services/leaves-service';

export const getAllData = async (req: Request, res: Response) => {
  let skip: number = 0, take: number = 5
  let page: any = req.query.page

  // limit pagination
  if(page) {
    page = parseInt(page)
    if(page > 1) skip = (page * 5) - 5
    else skip = 0
  }

  if(page) delete req.query.page

  const data = await getDataRequestLeaves(req, skip, take)

  if(!data) return res.status(400).json({
    status_code: 400,
    result: 'error',
    message: 'invalid params query'
  })

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

export const createData = async (req: Request, res: Response) => {
  const data = await insertDataRequestLeaves(req)

  if(!data) return res.status(500).json({
      status_code: 500,
      result: 'error',
      message: 'internal server error'
  })

  return res.json({
      status_code: 200,
      result: 'success',
      message: 'record has been created'
  })
};

export const detailsData = async (req: Request, res: Response): Promise<void> => {

};

export const updateRequestLeaveById = async (req: Request, res: Response) => {
  const data = await updateDataRequestLeave(req)

  if(!data) return res.status(404).json({
      status_code: 401,
      result: 'error',
      message: 'record to update not found'
  })
      
  return res.json({
      status_code: 200,
      result: 'success',
      message: 'successfully update record data',
      data: data
  })
};

export const deleteRequestLeaveById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const data = await deleteDataRequestLeave(id)

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
};
