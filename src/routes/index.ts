import express from 'express'
import RequestReimbursement from './reimbursement-router'
import RequestLeaves from './leaves-router'
import Attendances from './attendances-router'
import AuthMiddleware from '../middleware/auth-middleware'

const router = express.Router()

router.use('/request-leaves', AuthMiddleware, RequestLeaves)
router.use('/request-reimbursement', AuthMiddleware, RequestReimbursement)
router.use('/attendances', AuthMiddleware, Attendances)

export default router