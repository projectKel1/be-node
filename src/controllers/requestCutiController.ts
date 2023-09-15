import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getRequestLeaves(req: Request, res: Response) {
  try {
    const { page, status, user } = req.query;
    let query: any = {};

    if (status) {
      query.status = status as string;
    }

    if (user) {
      query.user_id = user as string;
    }

    const leaves = await prisma.requestLeave.findMany({
      where: query,
      take: 20,
      skip: ((page as number) - 1) * 20,
    });

    res.status(200).json({
      status_code: 200,
      result: 'success',
      message: 'successfully fetch data',
      data: leaves,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createRequestLeave(req: Request, res: Response) {
  try {
    const { user_id, reason, started_date, ended_date, url_proof } = req.body;

    if (!user_id || !reason || !started_date || !ended_date) {
      return res.status(400).json({
        status_code: 400,
        result: 'error',
        message: {
          reason: 'reason field is required',
        },
      });
    }

    const newRequestLeave = await prisma.requestLeave.create({
      data: {
        user_id,
        reason,
        started_date,
        ended_date,
        url_proof: url_proof || null,
        status: 'pending',
      },
    });

    res.status(200).json({
      status_code: 200,
      result: 'success',
      message: 'record has been created',
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getRequestLeaveDetails(req: Request, res: Response) {
  try {
    const { user_id } = req.params;
    const requestLeave = await prisma.requestLeave.findUnique({
      where: { user_id: user_id as string },
    });

    if (!requestLeave) {
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
      data: requestLeave,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateRequestLeave(req: Request, res: Response) {
  try {
    const { leaves_id } = req.params;
    const { user_id, reason, started_date, ended_date, url_proof } = req.body;

    if (!user_id || !reason || !started_date || !ended_date) {
      return res.status(400).json({
        status_code: 400,
        result: 'error',
        message: {
          reason: 'reason field is required',
        },
      });
    }

    const updatedRequestLeave = await prisma.requestLeave.update({
      where: { id: parseInt(leaves_id as string) },
      data: {
        user_id,
        reason,
        started_date,
        ended_date,
        url_proof: url_proof || null,
        status: 'pending',
      },
    });

    res.status(200).json({
      status_code: 200,
      result: 'success',
      message: 'successfully update data',
      data: updatedRequestLeave,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteRequestLeave(req: Request, res: Response) {
  try {
    const { leaves_id } = req.params;
    await prisma.requestLeave.delete({ where: { id: parseInt(leaves_id as string) } });
    res.status(200).json({
      status_code: 200,
      result: 'success',
      message: 'record has been deleted',
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export {
  getRequestLeaves,
  createRequestLeave,
  getRequestLeaveDetails,
  updateRequestLeave,
  deleteRequestLeave,
};