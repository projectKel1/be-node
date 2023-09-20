import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllTargetReports = async (
  skip: number,
  take: number,
  status: any,
  user: any
) => {
  return await prisma.targetReport.findMany({
    skip,
    take,
    where: {
      status,
      user,
    },
  });
};

export const createTargetReportRecord = async (
  user_id: any,
  target_id: any,
  status: any,
  url_proof: any
) => {
  try {
    await prisma.targetReport.create({
      data: {
        user_id,
        target_id,
        status,
        url_proof,
      },
    });

    return {
      status_code: 200,
      result: 'success',
      message: 'record has been created',
    };
  } catch (error) {
    return {
      status_code: 400,
      result: 'error',
      message: 'status field is required',
    };
  }
};

export const getTargetReportDetails = async (id: string) => {
  const targetReport = await prisma.targetReport.findUnique({
    where: {
      id,
    },
  });

  if (!targetReport) {
    return {
      status_code: 404,
      result: 'error',
      message: 'data not found',
      data: null,
    };
  }

  return {
    status_code: 200,
    result: 'success',
    message: 'successfully fetch data',
    data: targetReport,
  };
};

export const updateTargetReportRecord = async (
  id: string,
  user_id: any,
  target_id: any,
  status: any,
  url_proof: any
) => {
  try {
    const updatedTargetReport = await prisma.targetReport.update({
      where: {
        id,
      },
      data: {
        user_id,
        target_id,
        status,
        url_proof,
      },
    });

    if (!updatedTargetReport) {
      return {
        status_code: 404,
        result: 'error',
        message: 'data not found',
        data: null,
      };
    }

    return {
      status_code: 200,
      result: 'success',
      message: 'successfully update data',
      data: updatedTargetReport,
    };
  } catch (error) {
    return {
      status_code: 400,
      result: 'error',
      message: 'status field is required',
    };
  }
};

export const deleteTargetReportRecord = async (id: string) => {
  const deleted = await prisma.targetReport.softdelete({
    where: {
      id,
    },
  });

  if (!deleted) {
    return {
      status_code: 404,
      result: 'error',
      message: 'data not found',
    };
  }

  return {
    status_code: 200,
    result: 'success',
    message: 'record has been deleted',
  };
};