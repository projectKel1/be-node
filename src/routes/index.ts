import express from 'express'
import RequestReimbursement from './reimbursement-router'
import Attendances from './attendances-router'
import AuthMiddleware from '../middleware/auth-middleware'

const router = express.Router()

router.use('/request-reimbursement', AuthMiddleware, RequestReimbursement)
router.use('/attendances', Attendances)

export default router