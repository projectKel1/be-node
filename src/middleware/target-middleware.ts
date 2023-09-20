import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export default async (req: Request, res: Response, next: NextFunction) => {

    const validate = Joi.object({
        product: Joi.string()
            .required()
            .empty()
            .min(3)
            .messages({
                'any.required': 'product field is required',
                'string.empty': 'product field cannot has empty value',
                'string.min': 'product field cannot less than 3 characters'
            })
        ,
        quantity: Joi.number()
            .required()
            .empty()
            .min(1)
            .messages({
                'any.base': 'quantity field must be a number',
                'any.required': 'quantity field is required',
                'string.empty': 'quantity field cannot has empty value',
                'number.min': 'quantity field cannot less than 1'
            })
        ,
        ended_date: Joi.date()
            .required()
            .empty()
            .messages({
                'any.required': 'ended_date field is required',
                'string.empty': 'ended_date field cannot has empty value',
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