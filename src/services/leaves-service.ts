import { PrismaClient, Prisma } from '@prisma/client';
import { Request } from 'express';

export interface RequestLeave {
  id: number;
  user_id: number;
  reason: string;
  started_date: Date;
  ended_date: Date;
  url_proof: string | null;
  status: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

const prisma = new PrismaClient().$extends({
  query: {
    requestLeave: {
      async findMany({model, operation, args, query}) {
        args.where = {
          status: args.where?.status,
          deleted_at: null
        }
        return query(args)
      }
    }
  },
  model: {
    requestLeave: {
      async softDelete(id: number) {
        await prisma.requestLeave.update({
          where: {
            id: id
          },
          data: {
            deleted_at: new Date().toISOString()
          }
        })
      }
    }
  }
})

export const getDataRequestLeaves = async (req: Request, skip: number, take: number) => {
  let requestLeaves: RequestLeave[]
  
  try {
    requestLeaves = await prisma.requestLeave.findMany({
      where: req.query,
      skip: skip,
      take: take
    });
  } catch (err) {
    return null
  }

  return requestLeaves;
}

export const insertDataRequestLeaves = async (req: Request) => {
  const {reason, started_date, ended_date, url_proof} = req.body
  let createRequestLeave: Prisma.RequestLeaveCreateInput

  try {
    createRequestLeave = {
      user_id: req.user.id,
      reason: reason,
      started_date: started_date,
      ended_date: ended_date,
      url_proof: url_proof,
      status: "pending"
    }

    await prisma.requestLeave.create({
      data: createRequestLeave
    })
  } catch (err) {
    return false
  }

  return true

}

export const detailDataRequestLeaves = async (id: number) => {

  let data: RequestLeave | null

  try {
    data = await prisma.requestLeave.findFirst({
      where: {
        id: id
      }
    })
  } catch (err) {
    return false
  }

  return data

}

export const updateDataRequestLeave = async (req: Request) => {
  let data: RequestLeave
  const {reason, url_proof, status} = req.body

  try {
    data = await prisma.requestLeave.update({
      where: {
        id: parseInt(req.params.id)
      },
      data: {
        user_id: req.user.id,
        reason: reason,
        url_proof: url_proof,
        status: status
      }
    })
  } catch (err) {
    return null
  }

  return data
}

export const deleteDataRequestLeave = async (id: number) => {
  try {
    await prisma.requestLeave.softDelete(id)
  } catch (err) {
    return null
  }

  return true
}