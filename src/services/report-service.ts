import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { getAllUsers } from "../api/users";
import { DefaultArgs } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export interface TargetReport {
  id: number;
  user_id: any;
  fullname?: string;
  target_id: number;
  status: string;
  url_proof: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface UserData {
  id: number;
  fullname: string;
}

export const getAllTargetReports = async (
  req: Request,
  skip: number,
  take: number
) => {
  let targetReports: TargetReport[] = [];
  let userdata: UserData[] | null = [];
  let json: any[] = [];

  if (req.user.level == "EMPLOYEE") {
    req.query.user_id = req.user.userId;

    try {
      const report_Targets = await prisma.report_Target.findMany({
        where: req.query,
        skip: skip,
        take: take,
      });

      for (let data of targetReports) {
        data.fullname = req.user.full_name;
      }
    } catch (err) {
      throw new Error("invalid params query");
    }

    return targetReports;
  } else {
    userdata = await getAllUsers(req, req.user.userId);

    const report_Targets = await prisma.report_Target.findMany({
      where: req.query,
      skip: skip,
      take: take,
    });

    targetReports.map((value: TargetReport) => {
      let user = userdata?.find((user: UserData) => {
        return user.id == value.user_id;
      });

      let data = {
        id: value.id,
        user_id: value.user_id,
        fullname: user?.fullname,
        target_id: value.target_id,
        status: value.status,
        url_proof: value.url_proof,
        created_at: value.created_at,
        updated_at: value.updated_at,
        deleted_at: value.deleted_at,
      };

      json.push(data);
    });

    return json.filter((value: any) => value.fullname !== undefined);
  }
};

export const getTargetReportDetails = async (id: string) => {
  const idNumber = parseInt(id);
  const gettargetReport = await prisma.report_Target.findUnique({
    where: {
      id: idNumber,
    },
  });

  if (!gettargetReport) {
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
    data: gettargetReport,
  };
};

export const createTargetReportRecord = async (
  id: any,
  user_id: any,
  target_id: any,
  status: DefaultArgs | null,
) => {
  if (!id || !user_id || !target_id || status === null) {
    throw new Error('All arguments must be filled in');
  }
}

export const updateTargetReportRecord = async (
  id: any,
  user_id: any,
  target_id: any,
  status: any,
) => {
  try {
    const updatedTargetReport = await prisma.report_Target.update({
      where: {
        id,
      },
      data: {
        user_id,
        target_id,
        status,
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
  const idNumber = parseInt(id);
  const deleted = await prisma.report_Target.delete({
    where: {
      id: idNumber,
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