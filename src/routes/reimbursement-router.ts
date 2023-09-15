import express from 'express'
import { createData, detailsData, getAllData } from '../controllers/reimbursement-controller'
import ReimbursementMiddleware from '../middleware/reimbursement-middleware'

const router = express.Router()

router.get('/', getAllData)
router.post('/', ReimbursementMiddleware, createData)
router.get('/:reimbursment_id', detailsData)

export default router