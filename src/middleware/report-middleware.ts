import { NextFunction, Request, Response } from "express";
import Joi from "joi";


export const validateInput = async (req: Request, res: Response, next: NextFunction) => {
    const validate = Joi.object({
        status: Joi.string()
            .required()
            .empty()
            .valid('pending', 'approved_lead', 'approved_hr', 'reject')
            .messages({
                'any.required': 'status field is required',
                'string.empty': 'status field cannot have an empty value',
                'string.valid': 'status field can only be pending, approved_lead, approved_hr, reject'
            }),
        url_proof: Joi.string()
            .trim()
            .pattern(/^\S*$/, {name: 'url_proof'})
            .messages({
                'string.pattern': 'url_proof field cannot contains whitespace'
            })
        })

    try {
        await validate.validateAsync(req.body, {
            abortEarly: false
        });
        next();
    } catch (err: any) {
        let errorMessages: any = {}
        err.details.map((err: any) => {
            errorMessages[err.context.key] = err.message
        })

        return res.status(400).json({
            status_code: 400,
            result: 'error',
            message: errorMessages
        });
    }
};