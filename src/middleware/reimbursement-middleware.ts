import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export default async (req: Request, res: Response, next: NextFunction) => {

    const validation = Joi.object({
        user_id: Joi.number()
            .required()
            .empty()
            .messages({
                'any.required': 'user_id field is required',
                'string.empty': 'user_id field cannot has empty value',
                'number.base': 'user_id field must be a number'
            })
        ,
        description: Joi.string()
            .required()
            .empty()
            .min(5)
            .messages({
                'any.required': 'description field is required',
                'string.empty': 'description field cannot has empty value',
                'string.min': 'description field cannot less than 5 characters'
            })
        ,
        type: Joi.string()
            .required()
            .empty()
            .valid('transportation', 'dentist', 'glasses', 'others')
            .messages({
                'any.required': 'type field is required',
                'string.empty': 'type field cannot has empty value'
            })
        ,
        nominal: Joi.number()
            .required()
            .empty()
            .min(500)
            .unsafe()
            .messages({
                'any.required': 'type nominal is required',
                'string.empty': 'type nominal cannot has empty value',
                'number.base': 'type nominal must be a number',
                'number.min': 'type nominal cannot less than 500'
            })
        ,
        url_proof: Joi.string()
    })

    try {
        await validation.validateAsync(req.body, {
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