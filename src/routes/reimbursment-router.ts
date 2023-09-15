import express from 'express'
import { createData, detailsData, getAllData } from '../controllers/reimbursment-controller'
import reimbursmentMiddleware from '../middleware/reimbursment-middleware'

const router = express.Router()

router.get('/', getAllData)
router.post('/', reimbursmentMiddleware, createData)
router.get('/:reimbursment_id', detailsData)

export default router