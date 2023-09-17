import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface RequestLeave {
  id: number;
  user_id: number;
  reason: string;
  started_date: string;
  ended_date: string;
  url_proof: string;
  status: string;
  created_date: string;
  updated_date: string;
  deleted_at: string | null;
}

export const RequestLeaveService = {
  getAllRequestLeaves: async (): Promise<RequestLeave[]> => {
    const requestLeaves = await prisma.requestLeave.findMany();
    return requestLeaves;
  },
  createRequestLeave: async (requestLeave: RequestLeave): Promise<void> => {
    await prisma.requestLeave.create({
      data: requestLeave,
    });
  },
  getRequestLeaveByUserId: async (userId: number): Promise<RequestLeave | null> => {
    const requestLeave = await prisma.requestLeave.findFirst({
      where: {
        user_id: userId,
      },
    });
    return requestLeave || null;
  },
  updateRequestLeaveById: async (leaveId: number, updatedLeave: RequestLeave): Promise<void> => {
    await prisma.requestLeave.update({
      where: {
        id: leaveId,
      },
      data: updatedLeave,
    });
  },
  deleteRequestLeaveById: async (leaveId: number): Promise<void> => {
    await prisma.requestLeave.delete({
      where: {
        id: leaveId,
      },
    });
  },
};
