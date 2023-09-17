import { Request, Response } from 'express';
import { RequestLeave, RequestLeaveService } from '../services/requestLeavesService';

export const getAllRequestLeaves = async (req: Request, res: Response): Promise<void> => {
  try {
    const requestLeaves = await RequestLeaveService.getAllRequestLeaves();

    if (requestLeaves.length > 0) {
      res.status(200).json({
        status_code: 200,
        result: 'success',
        message: 'successfully fetch data',
        data: requestLeaves,
      });
    } else {
      res.status(404).json({
        status_code: 404,
        result: 'error',
        message: 'data not found',
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      status_code: 500,
      result: 'error',
      message: 'internal server error',
    });
  }
};

export const createRequestLeave = async (req: Request, res: Response): Promise<void> => {
    try {
      const { reason, started_date, ended_date, url_proof, status } = req.body;
      if (!reason) {
        res.status(400).json({
          status_code: 400,
          result: 'error',
          message: {
            reason: 'reason field is required',
          },
        });
      }
  
      const newRequestLeave: RequestLeave = {
        id: 1,
        user_id: 1,
        reason,
        started_date,
        ended_date,
        url_proof,
        status,
        created_date: '15-01-2023',
        updated_date: '17-01-2023',
        deleted_at: null,
      };
  
      await RequestLeaveService.createRequestLeave(newRequestLeave);
  
      res.status(200).json({
        status_code: 200,
        result: 'success',
        message: 'record has been created',
      });
    } catch (error) {
      res.status(500).json({
        status_code: 500,
        result: 'error',
        message: 'internal server error',
      });
    }
  };

export const getRequestLeaveByUserId = async (req: Request, res: Response): Promise<void> => {
  const { user_id } = req.params;
  try {
    const requestLeave = await RequestLeaveService.getRequestLeaveByUserId(parseInt(user_id));

    if (requestLeave) {
      res.status(200).json({
        status_code: 200,
        result: 'success',
        message: 'successfully fetch data',
        data: requestLeave,
      });
    } else {
      res.status(404).json({
        status_code: 404,
        result: 'error',
        message: 'data not found',
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      status_code: 500,
      result: 'error',
      message: 'internal server error',
    });
  }
};

export const updateRequestLeaveById = async (req: Request, res: Response): Promise<void> => {
  const { leaves_id } = req.params;
  try {
    const { reason, started_date, ended_date, url_proof, status } = req.body;
    if (!reason) {
      res.status(400).json({
        status_code: 400,
        result: 'error',
        message: {
          reason: 'reason field is required',
        },
      });
    }

    const newRequestLeave: RequestLeave = {
        id: 1,
        user_id: 1,
        reason,
        started_date,
        ended_date,
        url_proof,
        status,
        created_date: '15-01-2023',
        updated_date: '17-01-2023',
        deleted_at: null,
      };
  
      await RequestLeaveService.createRequestLeave(newRequestLeave);

    res.status(200).json({
      status_code: 200,
      result: 'success',
      message: 'successfully update data',
      data: {
        id: parseInt(leaves_id),
        user_id: 1,
        reason,
        started_date,
        ended_date,
        url_proof,
        status,
        created_date: '15-01-2023',
        updated_date: '17-01-2023',
        deleted_at: null,
      },
    });
  } catch (error) {
    res.status(500).json({
      status_code: 500,
      result: 'error',
      message: 'internal server error',
    });
  }
};

export const deleteRequestLeaveById = async (req: Request, res: Response): Promise<void> => {
  const { leaves_id } = req.params;
  try {
    await RequestLeaveService.deleteRequestLeaveById(parseInt(leaves_id));
    res.status(200).json({
      status_code: 200,
      result: 'success',
      message: 'record has been deleted',
    });
  } catch (error) {
    res.status(404).json({
      status_code: 404,
      result: 'error',
      message: 'data not found',
    });
  }
};
