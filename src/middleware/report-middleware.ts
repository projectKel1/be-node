import { NextFunction, Request, Response } from "express";
import Joi from "joi";


export const validateInput = async (req: Request, res: Response, next: NextFunction) => {
    const validate = Joi.object({
        product: Joi.string()
            .required()
            .empty()
            .min(3)
            .messages({
                'any.required': 'product field is required',
                'string.empty': 'product field cannot have an empty value',
                'string.min': 'product field cannot be less than 3 characters'
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

export const validateUserRole = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const userRole = req.user; 
    
    if (userRole === 'manager') {
        next();
    } else if (userRole === 'employee') {
        const userIdFromRequest = req.body.user_id || req.params.user_id;

        if (userIdFromRequest === req.user) {
            next();
        } else {
            return res.status(403).json({
                status_code: 403,
                result: 'error',
                message: 'You are not permitted to access this data',
            });
        }
    }
};
