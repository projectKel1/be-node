import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export default async (req: Request, res: Response, next: NextFunction) => {

    const validate = Joi.object({
        reason: Joi.string()
            .required()
            .empty()
            .min(5)
            .messages({
                'any.required': 'reason field is required',
                'string.empty': 'reason field cannot has empty value',
                'string.min': 'reason field cannot less than 5 characters'
            })
        ,
        started_date: Joi.date()
            .required()
            .empty()
            .messages({
                'any.required': 'started_date field is required',
                'string.empty': 'started_date field cannot has empty value',
            })
        ,
        ended_date: Joi.date()
        .required()
        .empty()
        .messages({
            'any.required': 'ended_date ft: add middlware ield is required',
            'string.empty': 'ended_date field cannot has empty value',
        })
        ,
        url_proof: Joi.string()
            .trim()
            .pattern(/^\S*$/, {name: 'url_proof'})
            .messages({
                'string.pattern': 'url_proof field cannot contains whitespace'
            })
        ,
        status: Joi.string()
            .required()
            .empty()
            .valid('pending', 'approved_lead', 'approved_hr', 'reject')
            .messages({
                'any.required': 'status field is required',
                'string.empty': 'status field cannot has empty value'
            })
    })

    try {
        await validate.validateAsync(req.body, {
            abortEarly: false
        })
    } catch (err: any) {
        let errorMessages: any = {}
        err.details.map((err: any) => {
            errorMessages[err.context.key] = err.message
        })

        return res.status(400).json({
            status_code: 400,
            result: 'error',
            message: errorMessages
        })
    }

    return next()

}