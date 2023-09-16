import express from 'express'
import RequestReimbursement from './reimbursement-router'
import AuthMiddleware from '../middleware/auth-middleware'

const router = express.Router()

router.use('/request-reimbursement', AuthMiddleware, RequestReimbursement)

export default router