import express from 'express'
import ReimbursementRouter from './reimbursement-router'
import AttendancesRouter from './attendances-router'
const router = express.Router()

router.use('/request-reimbursement', ReimbursementRouter)
router.use('/attendances', AttendancesRouter)

export default router